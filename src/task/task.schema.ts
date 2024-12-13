import { Type } from '@nestjs/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * Schema and model for the `Task` document.
 * This schema defines the structure of the task documents stored in MongoDB.
 * Tasks represent work items that are assigned to employees and can be linked to services.
 * 
 * The schema includes properties like title, description, status, assigned employee, service, cost, and time.
 */

/**
 * Task class represents the structure of a task in the database.
 * It extends from the Mongoose Document class to integrate with the Mongoose model.
 */
@Schema()
export class Task extends Document {

  /**
   * The title of the task.
   * - Must be a non-empty string.
   */
  @Prop({ required: true })
  title: string;

  /**
   * A detailed description of the task.
   * - Must be a non-empty string.
   */
  @Prop({ required: true })
  description: string;

  /**
   * The status of the task.
   * - Values can be 'On Standby', 'In Progress', or 'Completed'.
   */
  @Prop({ required: true })
  status: string; // 'On Standby', 'In Progress', 'Completed'

  /**
   * The deadline for the task.
   * - Must be a valid date.
   */
  @Prop({ required: true })
  deadline: Date;

  /**
   * The service linked to this task.
   * - The task may or may not be linked to a service (optional).
   * - References a `Service` document by its ObjectId.
   */
  @Prop({ type: Types.ObjectId, ref: 'Service', required: false })
  service: Types.ObjectId;

  /**
   * The employee assigned to the task.
   * - References an `Employee` document by its ObjectId.
   * - Must be a valid employee (required).
   */
  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  assignedTo: Types.ObjectId;

  /**
   * The cost associated with the task.
   * - Defaults to 0 if not specified.
   */
  @Prop({ default: 0 })
  cost: number;

  /**
   * The time spent on the task.
   * - Defaults to 0 if not specified.
   */
  @Prop({ default: 0 })
  time: number;

}

/**
 * Create a Mongoose schema for the `Task` class.
 * The schema will be used to interact with MongoDB collections related to tasks.
 */
export const TaskSchema = SchemaFactory.createForClass(Task);
