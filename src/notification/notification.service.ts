import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.schema';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
  ) {}

  /**
   * Create a new notification.
   * 
   * This method creates a new notification for an employee with the provided message and type.
   * The notification will be saved to the database.
   *
   * @param employeeId - The ID of the employee to associate with the notification.
   * @param createNotificationDto - The DTO containing notification details such as message and type.
   * @returns The newly created notification document.
   */
  async createNotification(
    employeeId: string,
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    try {
      const { message, type } = createNotificationDto; // Extract fields from DTO
      const newNotification = new this.notificationModel({
        employee: employeeId, // Assign the employee ID
        message,
        type,
      });
      return await newNotification.save(); // Save to the database
    } catch (error) {
      throw new BadRequestException(`Error creating notification: ${error.message}`);
    }
  }

  /**
   * Retrieve all notifications for a specific employee.
   * 
   * This method fetches all notifications associated with a particular employee from the database.
   *
   * @param employeeId - The ID of the employee whose notifications are to be retrieved.
   * @returns An array of notifications for the specified employee.
   */
  async getNotificationsForEmployee(employeeId: string): Promise<Notification[]> {
    try {
      return await this.notificationModel.find({ employee: employeeId }).exec();
    } catch (error) {
      throw new BadRequestException(`Error fetching notifications: ${error.message}`);
    }
  }

  /**
   * Update the read status of a notification.
   * 
   * This method marks a specific notification as read or unread, based on the provided `read` value.
   *
   * @param notificationId - The ID of the notification to be updated.
   * @param updateNotificationDto - The DTO containing the new `read` status.
   * @returns The updated notification document.
   */
  async markAsRead(notificationId: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    try {
      const { read } = updateNotificationDto; // Extract the `read` field from DTO
      const updatedNotification = await this.notificationModel.findByIdAndUpdate(
        notificationId,
        { read }, // Update the read status
        { new: true }, // Return the updated document
      ).exec();

      if (!updatedNotification) {
        throw new NotFoundException(`Notification with ID ${notificationId} not found`);
      }
      
      return updatedNotification;
    } catch (error) {
      throw new BadRequestException(`Error updating notification: ${error.message}`);
    }
  }

  /**
   * Delete a notification by ID.
   * 
   * This method deletes a notification from the database using its ID.
   * If the notification does not exist, an error is thrown.
   *
   * @param notificationId - The ID of the notification to be deleted.
   * @returns A void response if deletion is successful.
   * @throws Error if the notification is not found.
   */
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      const result = await this.notificationModel.findByIdAndDelete(notificationId).exec();

      if (!result) {
        throw new NotFoundException(`Notification with ID ${notificationId} not found`);
      }
    } catch (error) {
      throw new BadRequestException(`Error deleting notification: ${error.message}`);
    }
  }
}
