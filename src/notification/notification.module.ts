// src/notification/notification.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification, NotificationSchema } from './notification.schema';
import { Employee, EmployeeSchema } from '../employee/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
