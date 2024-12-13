// src/service/service.schema.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Service schema representing a service that can be offered by an employee or organization.
 * This schema defines the structure for the 'Service' document in the MongoDB database.
 */
@Schema()
export class Service extends Document {

  /**
   * The name of the service.
   * @example "AWS"
   * @required true
   */
  @Prop({ required: true })
  name: string;

  /**
   * A brief description of the service.
   * @example "Creating responsive and user-friendly websites."
   * @required true
   */
  @Prop({ required: true })
  description: string;

  /**
   * The rate for the service, which could represent an hourly rate, fixed cost, or other type of pricing.
   * @example 100
   * @required true
   */
  @Prop({ required: true })
  rate: number;
}

/**
 * The schema factory method to create the schema for the 'Service' model.
 */
export const ServiceSchema = SchemaFactory.createForClass(Service);
