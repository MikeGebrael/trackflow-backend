import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

/**
 * Service responsible for managing tasks in the application.
 * Provides CRUD operations for creating, retrieving, updating, and deleting tasks.
 * Also includes a method to fetch tasks by employee ID.
 */
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  /**
   * Creates a new task.
   * 
   * @param createTaskDto - Data Transfer Object containing task details.
   * @returns A newly created task.
   * @throws BadRequestException if there is an error during task creation.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = new this.taskModel(createTaskDto);
      return await newTask.save();
    } catch (error) {
      throw new BadRequestException('Error creating task', error.message);
    }
  }

  /**
   * Retrieves all tasks from the database.
   * 
   * @returns An array of all tasks.
   * @throws BadRequestException if there is an error fetching tasks.
   */
  async findAll(): Promise<Task[]> {
    try {
      return await this.taskModel.find().populate('assignedTo').populate('service').exec();
    } catch (error) {
      throw new BadRequestException('Error fetching tasks', error.message);
    }
  }

  /**
   * Retrieves a single task by its ID.
   * 
   * @param id - The ID of the task to retrieve.
   * @returns The task if found.
   * @throws NotFoundException if no task is found with the given ID.
   * @throws NotFoundException if there is an error during fetching the task.
   */
  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).populate('assignedTo').populate('service').exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new NotFoundException('Error fetching task', error.message);
    }
  }

  /**
   * Updates a task by its ID.
   * 
   * @param id - The ID of the task to update.
   * @param updateTaskDto - Data Transfer Object containing the updated task details.
   * @returns The updated task.
   * @throws NotFoundException if no task is found with the given ID.
   * @throws BadRequestException if there is an error during task update.
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
      if (!updatedTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return updatedTask;
    } catch (error) {
      throw new BadRequestException('Error updating task', error.message);
    }
  }

  /**
   * Deletes a task by its ID.
   * 
   * @param id - The ID of the task to delete.
   * @returns The deleted task.
   * @throws NotFoundException if no task is found with the given ID.
   * @throws NotFoundException if there is an error during task deletion.
   */
  async remove(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findByIdAndDelete(id).exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new NotFoundException('Error deleting task', error.message);
    }
  }

  /**
   * Retrieves all tasks assigned to a specific employee.
   * 
   * @param employeeId - The ID of the employee whose tasks to retrieve.
   * @returns An array of tasks assigned to the employee.
   * @throws BadRequestException if there is an error fetching tasks for the employee.
   */
  async findByEmployeeId(employeeId: string): Promise<Task[]> {
    try {
      return await this.taskModel
        .find({ assignedTo: employeeId })
        .populate('assignedTo')
        .populate('service')
        .exec();
    } catch (error) {
      throw new BadRequestException('Error fetching tasks for employee', error.message);
    }
  }
}
