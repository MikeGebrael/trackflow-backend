// src/notification/notification.controller.ts

import { Controller, Post, Get, Param, Body, Patch, UseGuards, Delete, BadRequestException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.schema';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
import { JwtAuthGuard } from '../auth/auth.guard'; // Guard for securing routes

/**
 * Controller to manage notifications for employees.
 * This controller provides endpoints for creating, retrieving, updating, and deleting notifications.
 */
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * Create a new notification for an employee.
   * @param employeeId The ID of the employee to whom the notification belongs.
   * @param createNotificationDto The data required to create the notification.
   * @returns The created notification.
   */
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Post('employee/:employeeId')
  async createNotification(
    @Param('employeeId') employeeId: string,
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    try {
      // Pass the DTO directly to the service to create a notification
      return await this.notificationService.createNotification(employeeId, createNotificationDto);
    } catch (error) {
      throw new BadRequestException(`Error creating notification: ${error.message}`);
    }
  }

  /**
   * Get all notifications for a specific employee.
   * @param employeeId The ID of the employee whose notifications are being fetched.
   * @returns A list of notifications for the specified employee.
   */
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Get('employee/:employeeId')
  async getNotificationsForEmployee(
    @Param('employeeId') employeeId: string,
  ): Promise<Notification[]> {
    try {
      // Retrieve all notifications for the specified employee
      return await this.notificationService.getNotificationsForEmployee(employeeId);
    } catch (error) {
      throw new BadRequestException(`Error retrieving notifications: ${error.message}`);
    }
  }

  /**
   * Mark a notification as read or unread.
   * @param notificationId The ID of the notification to update.
   * @param updateNotificationDto The data required to update the read status.
   * @returns The updated notification.
   */
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Patch(':notificationId')
  async markAsRead(
    @Param('notificationId') notificationId: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    try {
      // Pass the DTO directly to the service to update the notification's read status
      return await this.notificationService.markAsRead(notificationId, updateNotificationDto);
    } catch (error) {
      throw new BadRequestException(`Error updating notification: ${error.message}`);
    }
  }

  /**
   * Delete a notification by its ID.
   * @param notificationId The ID of the notification to delete.
   * @returns A success message confirming deletion.
   */
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  @Delete(':notificationId')
  async deleteNotification(
    @Param('notificationId') notificationId: string,
  ): Promise<{ message: string }> {
    try {
      await this.notificationService.deleteNotification(notificationId);
      return { message: `Notification with ID ${notificationId} deleted successfully.` };
    } catch (error) {
      throw new BadRequestException(`Error deleting notification: ${error.message}`);
    }
  }
}
