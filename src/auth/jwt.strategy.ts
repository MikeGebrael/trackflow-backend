// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common'; // Injectable decorator to allow dependency injection
import { PassportStrategy } from '@nestjs/passport'; // Base PassportStrategy for implementing JWT authentication
import { ExtractJwt, Strategy } from 'passport-jwt'; // ExtractJwt for extracting JWT from request, Strategy for implementing JWT strategy
import { JwtPayload } from './jwt-payload.interface'; // JwtPayload interface defines the structure of the JWT payload
import { EmployeeService } from '../employee/employee.service'; // Service to interact with employee data

/**
 * JWT Strategy class that extends PassportStrategy to implement the JWT authentication logic.
 * This class extracts the JWT from the request and validates it against the provided payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly employeeService: EmployeeService) {
    super({
      // Extract JWT from the Authorization header (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // Secret key used to verify the JWT token
      secretOrKey: process.env.SECRET_KEY || 'SecretKey', // Using environment variable for secret key
    });
  }

  /**
   * Validate the JWT token and retrieve the employee details from the database.
   * @param payload - The JWT payload containing the user information.
   * @returns {Promise<Employee>} The employee object if valid, or null if not found.
   * @throws {InternalServerErrorException} If there is an error retrieving the employee.
   */
  async validate(payload: JwtPayload) {
    try {
      // Attempt to find the employee by their ID (sub) in the payload
      const employee = await this.employeeService.findEmployeeById(payload.sub);

      // If the employee is not found, throw an error
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Return the employee object if found and valid
      return employee;
    } catch (error) {
      // Log the error and throw a server exception
      console.error('Error during JWT validation:', error);
      throw new Error('Error validating JWT token');
    }
  }
}
