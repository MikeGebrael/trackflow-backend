import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

/**
 * DTO (Data Transfer Object) classes for the `Service` module.
 * These classes are used to validate and transfer data between the client and the server.
 * 
 * The DTOs define the shape of the data that is sent to the API for creating or updating a service.
 * Validation rules ensure the integrity and correctness of the data before it is processed.
 */

/**
 * CreateServiceDto defines the structure of data required to create a new service.
 */
export class CreateServiceDto {
  
  /**
   * The name of the service.
   * - Must be a non-empty string.
   */
  @IsString() // Validates that 'name' is a string
  @IsNotEmpty() // Ensures 'name' is not empty
  name: string;

  /**
   * A description of the service.
   * - Must be a non-empty string.
   */
  @IsString() // Validates that 'description' is a string
  @IsNotEmpty() // Ensures 'description' is not empty
  description: string;

  /**
   * The rate charged for the service.
   * - Must be a number and not empty.
   */
  @IsNumber() // Validates that 'rate' is a number
  @IsNotEmpty() // Ensures 'rate' is not empty
  rate: number;
}

/**
 * UpdateServiceDto defines the structure of data required to update an existing service.
 * This DTO is similar to CreateServiceDto but is used to update a service's properties.
 */
export class UpdateServiceDto {

  /**
   * The name of the service.
   * - Must be a non-empty string.
   */
  @IsString() // Validates that 'name' is a string
  @IsNotEmpty() // Ensures 'name' is not empty
  name: string;

  /**
   * A description of the service.
   * - Must be a non-empty string.
   */
  @IsString() // Validates that 'description' is a string
  @IsNotEmpty() // Ensures 'description' is not empty
  description: string;

  /**
   * The rate charged for the service.
   * - Must be a number and not empty.
   */
  @IsNumber() // Validates that 'rate' is a number
  @IsNotEmpty() // Ensures 'rate' is not empty
  rate: number;
}
