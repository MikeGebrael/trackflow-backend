// src/auth/auth.service.ts

import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common'; // Added InternalServerErrorException for unexpected errors
import { JwtService } from '@nestjs/jwt'; // JWT service for token management
import { EmployeeService } from '../employee/employee.service'; // Service to interact with employee data
import * as bcrypt from 'bcrypt'; // Library for hashing and verifying passwords
import { JwtPayload } from './jwt-payload.interface'; // Interface defining the structure of the JWT payload
import { Employee } from '../employee/employee.schema'; // Employee schema for type definitions
import { AuthDto } from './dto/auth.dto'; // Data Transfer Object for authentication payload

/**
 * Service for handling authentication logic, including user validation
 * and JWT token generation.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService, // Inject the EmployeeService
  ) {}

  /**
   * Validate the employee credentials (username and password).
   * @param username - The username of the employee.
   * @param password - The password provided by the employee.
   * @returns {Promise<Employee | null>} The employee object if validation succeeds, or null otherwise.
   */
  async validateUser(username: string, password: string): Promise<Employee | null> {
    try {
      // Find the employee by username
      const employee = await this.employeeService.findEmployeeByUsername(username);

      // Check if the employee exists and the password matches
      if (employee && bcrypt.compareSync(password, employee.password)) {
        return employee; // Return the employee object if validation succeeds
      }

      // Return null if validation fails
      return null;
    } catch (error) {
      // Log the error and throw a server exception
      console.error('Error validating user:', error);
      throw new InternalServerErrorException('An error occurred while validating user credentials');
    }
  }

  /**
   * Generate a JWT token for an authenticated employee.
   * @param employee - The employee object for which the token is generated.
   * @returns {Promise<string>} The generated JWT token.
   */
  async generateToken(employee: Employee): Promise<string> {
    try {
      // Define the payload structure for the JWT token
      const payload: JwtPayload = {
        username: employee.username,
        role: employee.role,
        sub: employee._id.toString(), // Explicitly convert _id to a string
      };

      // Sign the JWT with a 1-hour expiration time (adjustable as needed)
      return this.jwtService.sign(payload, { expiresIn: '1h' });
    } catch (error) {
      // Log the error and throw a server exception
      console.error('Error generating token:', error);
      throw new InternalServerErrorException('An error occurred while generating the token');
    }
  }

  /**
   * Authenticate an employee and generate a JWT token.
   * @param authDto - The authentication payload containing username and password.
   * @returns {Promise<{ employee: Employee; token: string }>} The authenticated employee and the JWT token.
   * @throws {UnauthorizedException | InternalServerErrorException} If credentials are invalid or an error occurs.
   */
  async login(authDto: AuthDto): Promise<{ employee: Employee; token: string }> {
    const { username, password } = authDto;

    try {
      // Validate the employee credentials
      const employee = await this.validateUser(username, password);
      if (!employee) {
        // Throw an exception if validation fails
        throw new UnauthorizedException('Invalid username or password');
      }

      // Generate a JWT token for the authenticated employee
      const token = await this.generateToken(employee);

      // Return the employee object and the generated token
      return {
        employee,
        token,
      };
    } catch (error) {
      // Log the error and rethrow it if already known, or wrap it otherwise
      console.error('Error during login:', error);

      if (error instanceof UnauthorizedException) {
        throw error; // Rethrow known exceptions
      }

      throw new InternalServerErrorException('An error occurred during login');
    }
  }
}
