import { IsString, IsEmail, IsArray, IsOptional, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

// DTO for creating a new employee
export class CreateEmployeeDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string; // 'manager', 'employee', 'admin'

  @IsArray()
  skills: string[];

  @IsNumber()
  @IsOptional()
  salary?: number = 0; // Default to 0, as in your schema

  @IsNumber()
  @IsOptional()
  tasksCompleted?: number = 0; // Default to 0

  @IsNumber()
  @IsOptional()
  projectCompleted?: number = 0; // Default to 0

  @IsNumber()
  @IsOptional()
  hoursWorked?: number = 0; // Default to 0
}

// DTO for updating an employee
export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsNumber()
  tasksCompleted?: number;

  @IsOptional()
  @IsNumber()
  projectCompleted?: number;

  @IsOptional()
  @IsNumber()
  hoursWorked?: number;
}
