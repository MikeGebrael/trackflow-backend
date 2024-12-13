import { Module } from '@nestjs/common'; // Import necessary decorators from NestJS
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule to interact with MongoDB
import { EmployeeController } from './employee.controller'; // Import the Employee controller for handling routes
import { EmployeeService } from './employee.service'; // Import the Employee service for business logic
import { Employee, EmployeeSchema } from './employee.schema'; // Import Employee schema and model

/**
 * The EmployeeModule is responsible for managing all the operations related to employees,
 * such as creating, retrieving, updating, and deleting employee data.
 * It interacts with the Employee schema in MongoDB and exposes a service that can be used
 * by other modules or components in the application.
 */
@Module({
  imports: [
    /**
     * Register Mongoose schemas for Employee.
     * This tells NestJS that the Employee schema will be used within this module to interact with the Employee collection in the MongoDB database.
     * It also provides Mongoose models to be injected into the service for querying and manipulating Employee documents.
     */
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema }, // Registers Employee schema
    ]),
  ],
  exports: [
    /**
     * Export the EmployeeService so that it can be used by other modules that need to access employee data or functionality.
     */
    EmployeeService,

    /**
     * Export the MongooseModule to make the Employee schema available for use outside this module.
     */
    MongooseModule,
  ],
  controllers: [
    /**
     * The EmployeeController is responsible for handling HTTP requests related to employees.
     * It interacts with the EmployeeService to fetch or modify employee data based on the client’s requests.
     */
    EmployeeController,
  ],
  providers: [
    /**
     * The EmployeeService contains the business logic for managing employee data.
     * It communicates with the MongoDB database to perform CRUD operations on Employee documents.
     */
    EmployeeService,
  ],
})
export class EmployeeModule {}
