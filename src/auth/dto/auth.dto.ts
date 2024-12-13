import { IsString } from "class-validator"; // Importing IsString decorator for validating string type

/**
 * Data Transfer Object (DTO) for authentication.
 * This DTO is used to validate and transfer authentication-related data (username and password).
 */
export class AuthDto {

  /**
   * The username or email of the employee.
   * This will be used for identifying the employee during login.
   * The @IsString decorator ensures that the value is a valid string.
   */
  @IsString()
  username: string;

  /**
   * The password of the employee.
   * This will be used for authenticating the employee during login.
   * The @IsString decorator ensures that the value is a valid string.
   */
  @IsString()
  password: string;
}
