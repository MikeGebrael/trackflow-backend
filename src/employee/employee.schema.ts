import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; // Import necessary decorators from Mongoose
import { Document, Types } from 'mongoose'; // Import Mongoose Document and Types

/**
 * The Employee schema represents an employee's information in the database.
 * It includes properties like username, password, first and last names, email,
 * role, skills, salary, tasks completed, projects completed, and hours worked.
 * Each employee document extends Mongoose's Document to allow interaction with the database.
 */
@Schema()
export class Employee extends Document {
  
  /**
   * The unique username of the employee.
   */
  @Prop({ required: true })
  username: string;

  /**
   * The password of the employee, hashed for security.
   */
  @Prop({ required: true })
  password: string;

  /**
   * The first name of the employee.
   */
  @Prop({ required: true })
  firstName: string;

  /**
   * The last name of the employee.
   */
  @Prop({ required: true })
  lastName: string;

  /**
   * The email address of the employee.
   */
  @Prop({ required: true })
  email: string;

  /**
   * The role of the employee, indicating their position within the organization (e.g., 'Manager', 'Employee').
   */
  @Prop({ required: true })
  role: string;

  /**
   * An array of strings representing the skills of the employee (e.g., 'JavaScript', 'Node.js').
   */
  @Prop([String])
  skills: string[];

  /**
   * The salary of the employee, represented as a numeric value.
   * Default value is 0 if not specified.
   */
  @Prop({ default: 20 })
  salary: number;

  /**
   * The number of tasks completed by the employee.
   * Default value is 0 if not specified.
   */
  @Prop({ default: 0 })
  tasksCompleted: number;

  /**
   * The total hours worked by the employee.
   * Default value is 0 if not specified.
   */
  @Prop({ default: 0 })
  hoursWorked: number; // Added hoursWorked property
}

/**
 * Creates the Employee schema, which will be used to interact with the Employee collection in MongoDB.
 */
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
