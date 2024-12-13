// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // JWT module for token creation and validation
import { AuthService } from './auth.service'; // Authentication service
import { AuthController } from './auth.controller'; // Controller handling authentication routes
import { PassportModule } from '@nestjs/passport'; // Module for Passport.js integration
import { JwtStrategy } from './jwt.strategy'; // JWT strategy for validating tokens
import { EmployeeModule } from '../employee/employee.module'; // Employee module for employee-related logic

/**
 * Authentication module to handle login, JWT token creation, and validation.
 * Integrates Passport.js and JWT for authentication.
 */
@Module({
  imports: [
    // Passport module for handling strategies like JWT
    PassportModule,

    // JWT module to configure token generation and validation
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SecretKey', // Secret key for signing tokens (not using environment variables as this is a project)
      signOptions: { expiresIn: '60m' }, // Token expiration time (e.g., 60 minutes)
    }),

    // Employee module to access employee-related logic (e.g., finding employees by credentials)
    EmployeeModule,
  ],
  providers: [
    AuthService, // Service containing authentication business logic
    JwtStrategy, // JWT strategy for validating and decoding tokens
  ],
  controllers: [
    AuthController, // Controller managing authentication routes
  ],
})
export class AuthModule {}
