import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service, ServiceSchema } from './service.schema';

/**
 * ServiceModule is responsible for managing services in the application.
 * It encapsulates the logic for CRUD operations related to services,
 * and exposes the necessary services and controllers to interact with them.
 */
@Module({
  imports: [
    /**
     * MongooseModule.forFeature registers the Service schema with Mongoose,
     * allowing the Service model to be used for interacting with the MongoDB database.
     * This module makes the Service schema available for dependency injection throughout the application.
     */
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  providers: [
    /**
     * ServiceService is the provider that contains the business logic for
     * performing CRUD operations on the Service collection in MongoDB.
     */
    ServiceService,
  ],
  controllers: [
    /**
     * ServiceController handles incoming HTTP requests related to services.
     * It exposes endpoints to create, read, update, and delete services.
     */
    ServiceController,
  ],
  exports: [
    /**
     * ServiceService is exported so it can be used by other modules that require
     * service-related logic or dependencies, ensuring reusability.
     */
    ServiceService,

    /**
     * MongooseModule.forFeature is also exported to ensure the Service schema 
     * is available in other modules that may need to access or manipulate 
     * the Service collection in MongoDB.
     */
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
})
export class ServiceModule {}
