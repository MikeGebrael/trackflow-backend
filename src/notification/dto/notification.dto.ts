// src/notification/dto/notification.dto.ts

import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

/**
 * DTO for creating a new notification.
 * This class defines the structure of the data required to create a new notification.
 */
export class CreateNotificationDto {
  /**
   * The message content of the notification.
   * This field is required and must be a non-empty string.
   */
  @IsString()
  @IsNotEmpty()
  message: string;

  /**
   * The type of the notification (e.g., 'info', 'warning', etc.).
   * This field is required and must be a non-empty string.
   */
  @IsString()
  @IsNotEmpty()
  type: string;
}

/**
 * DTO for updating a notification.
 * This class defines the structure of the data required to update an existing notification's read status.
 */
export class UpdateNotificationDto {
  /**
   * The read status of the notification.
   * This field is required and must be a boolean value (true or false).
   */
  @IsBoolean() // Validates that 'read' is a boolean
  read: boolean;
}
