import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), // Task schema
    EmployeeModule,  // Import EmployeeModule to allow task assignments to employees
  ],
  exports: [
    TaskService,   // Export TaskService to make it available in other modules
    MongooseModule, // Export MongooseModule to make Task schema available
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
