import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; // Import necessary decorators and functions from Mongoose
import { Document, Types } from 'mongoose'; // Import Document and Types from Mongoose for type definitions

/**
 * Notification schema defines the structure for storing notification data in MongoDB.
 * Notifications are tied to specific employees and contain information about the message, type, read status, and creation time.
 * 
 * @property {string} message - The content of the notification.
 * @property {string} type - The type of notification, e.g., 'info', 'warning', etc.
 * @property {boolean} read - Indicates whether the notification has been read. Defaults to false.
 * @property {Types.ObjectId} employee - The reference to the employee the notification belongs to. It links to the Employee model.
 * @property {Date} createdAt - The timestamp when the notification was created. Defaults to the current date and time.
 */
@Schema()
export class Notification extends Document {

  /**
   * The content of the notification.
   * This field is required.
   */
  @Prop({ required: true })
  message: string;

  /**
   * The type of notification (e.g., 'info', 'warning').
   * This field is required.
   */
  @Prop({ required: true })
  type: string; // 'info', 'warning', etc.

  /**
   * A flag indicating whether the notification has been read.
   * Defaults to `false`.
   */
  @Prop({ default: false })
  read: boolean;

  /**
   * The ID of the employee this notification is associated with.
   * It references the `Employee` model and is required.
   */
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  employee: Types.ObjectId;

  /**
   * The timestamp when the notification was created.
   * Defaults to the current date and time when the notification is created.
   */
  @Prop({ default: Date.now })
  createdAt: Date;
}

/**
 * Creates the Mongoose schema for the Notification class.
 * This schema defines how Notification documents are structured in the MongoDB database.
 */
export const NotificationSchema = SchemaFactory.createForClass(Notification);
