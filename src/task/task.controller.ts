import { Controller, Get, Post, Body, Param, Delete, BadRequestException, NotFoundException, UseGuards, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

/**
 * Controller responsible for handling HTTP requests related to tasks.
 * Provides endpoints for creating, retrieving, updating, deleting tasks, and fetching tasks by employee ID.
 */
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Endpoint for creating a new task.
   * 
   * @param createTaskDto - Data Transfer Object containing task details.
   * @returns The created task.
   * @throws BadRequestException if there is an error during task creation.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.taskService.create(createTaskDto);
    } catch (error) {
      throw new BadRequestException('Error creating task', error.message);
    }
  }

  /**
   * Endpoint for retrieving all tasks.
   * 
   * @returns An array of all tasks.
   * @throws BadRequestException if there is an error fetching tasks.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.taskService.findAll();
    } catch (error) {
      throw new BadRequestException('Error fetching tasks', error.message);
    }
  }

  /**
   * Endpoint for retrieving a single task by its ID.
   * 
   * @param id - The ID of the task to retrieve.
   * @returns The task if found.
   * @throws NotFoundException if no task is found with the given ID.
   * @throws BadRequestException if there is an error fetching the task.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.taskService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error fetching task with ID ${id}: ${error.message}`);
    }
  }

  /**
   * Endpoint for updating a task by its ID.
   * 
   * @param id - The ID of the task to update.
   * @param updateTaskDto - Data Transfer Object containing updated task details.
   * @returns The updated task.
   * @throws NotFoundException if no task is found with the given ID.
   * @throws BadRequestException if there is an error during the update.
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return await this.taskService.update(id, updateTaskDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error updating task with ID ${id}: ${error.message}`);
    }
  }

  /**
   * Endpoint for deleting a task by its ID.
   * 
   * @param id - The ID of the task to delete.
   * @returns The deleted task.
   * @throws NotFoundException if no task is found with the given ID.
   * @throws BadRequestException if there is an error during task deletion.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.taskService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error deleting task with ID ${id}: ${error.message}`);
    }
  }

  /**
   * Endpoint for retrieving tasks assigned to a specific employee by their ID.
   * 
   * @param employeeId - The ID of the employee whose tasks to retrieve.
   * @returns An array of tasks assigned to the employee.
   * @throws BadRequestException if there is an error fetching tasks for the employee.
   */
  @UseGuards(JwtAuthGuard)
  @Get('employee/:employeeId')
  async findByEmployeeId(@Param('employeeId') employeeId: string) {
    try {
      return await this.taskService.findByEmployeeId(employeeId);
    } catch (error) {
      throw new BadRequestException(`Error fetching tasks for employee with ID ${employeeId}: ${error.message}`);
    }
  }
}
