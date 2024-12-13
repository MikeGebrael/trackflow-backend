// src/modules/task/dto/create-task.dto.ts
import { IsString, IsNotEmpty, IsDate, IsMongoId, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;  // 'On Standby', 'In Progress', 'Completed'

  @IsDate()
  deadline: Date;

  @IsMongoId()
  @IsOptional()
  service: string;

  @IsMongoId()
  @IsNotEmpty()
  assignedTo: string;  // The ObjectId of the assigned employee
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;  // 'Pending', 'In Progress', 'Completed'

  @IsDate()
  @IsOptional()
  deadline?: Date;

  @IsMongoId()
  @IsOptional()
  service: string;
  
  @IsMongoId()
  @IsOptional()
  assignedTo?: string;  // The ObjectId of the assigned employee
}