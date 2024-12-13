// src/auth/auth.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service'; // Service for authentication logic
import { AuthDto } from './dto/auth.dto'; // Data Transfer Object for login payload

/**
 * Controller for handling authentication-related routes.
 * Responsible for employee login and JWT token generation.
 */
@Controller('auth')
export class AuthController {
  /**
   * Injects the authentication service into the controller.
   * @param {AuthService} authService - The service that handles authentication logic.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Login route to authenticate an employee and return employee data and JWT token.
   * @param {AuthDto} body - The login data containing username/email and password.
   * @returns {Promise<{ employee: Employee; token: string }>} 
   *          The authenticated employee's data and a JWT token.
   */
  @Post('login')
  async login(@Body() body: AuthDto) {
    try {
      // Validate the login request using the AuthService
      const { employee, token } = await this.authService.login(body);

      // Return the authenticated employee object and the generated token
      return { employee, token };
    } catch (error) {
      // Log the error for debugging (optional)
      console.error('Error during login:', error);

      // Check for known errors and throw appropriate HTTP exceptions
      if (error.message === 'Invalid credentials') {
        throw new HttpException(
          { message: 'Invalid username or password' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Handle unexpected errors with a generic message
      throw new HttpException(
        { message: 'An error occurred while processing your request' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
