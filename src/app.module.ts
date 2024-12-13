import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './config/database.config';
import { EmployeeModule } from './employee/employee.module';
import { TaskModule } from './task/task.module';
import { NotificationModule } from './notification/notification.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';

/**
 * The root module of the application.
 * It imports the necessary modules for handling different functionality, 
 * such as employee management, task management, notifications, services, and authentication.
 * It also sets up the MongoDB connection using the MongooseModule.
 */
@Module({
  imports: [
    // MongooseModule is used to connect to the MongoDB database.
    MongooseModule.forRoot(databaseConfig.uri),

    // Importing EmployeeModule to handle employee-related features.
    EmployeeModule,

    // Importing TaskModule to handle task-related features.
    TaskModule,

    // Importing NotificationModule to manage notifications.
    NotificationModule,

    // Importing ServiceModule to manage services.
    ServiceModule,

    // Importing AuthModule to handle authentication and authorization.
    AuthModule,
  ],
})
export class AppModule {}
