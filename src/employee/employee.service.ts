import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'; // Import required exceptions
import { InjectModel } from '@nestjs/mongoose'; // For injecting the Employee model into the service
import { Model, Types } from 'mongoose'; // Mongoose types for modeling and handling MongoDB documents
import * as bcrypt from 'bcrypt'; // For password hashing
import { Employee } from './employee.schema'; // Employee schema model
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto'; // Data transfer objects for creating and updating employees

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>, // Injecting Employee model
  ) {}

  /**
   * Fetches all employees from the database.
   * @returns {Promise<Employee[]>} A promise that resolves to an array of employees.
   * @throws {BadRequestException} Throws an error if fetching employees fails.
   */
  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeModel.find().exec();
    } catch (error) {
      throw new BadRequestException(`Error fetching employees: ${error.message}`);
    }
  }

  /**
   * Creates a new employee and saves them to the database.
   * @param {CreateEmployeeDto} createEmployeeDto - The data transfer object containing employee details.
   * @returns {Promise<Employee>} A promise that resolves to the newly created employee.
   * @throws {BadRequestException} Throws an error if the username or email already exists or if creation fails.
   */
  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const { username, email, password } = createEmployeeDto;

      // Check if an employee with the same username or email already exists
      const existingEmployee = await this.employeeModel.findOne({
        $or: [{ username }, { email }],
      });

      if (existingEmployee) {
        throw new BadRequestException('Username or Email already exists');
      }

      // Hash the password using bcrypt before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new employee with the hashed password
      const newEmployee = new this.employeeModel({
        ...createEmployeeDto,
        password: hashedPassword,
      });

      // Save and return the newly created employee
      return await newEmployee.save();
    } catch (error) {
      throw new BadRequestException(`Error creating employee: ${error.message}`);
    }
  }

  /**
   * Finds an employee by their username.
   * @param {string} username - The username of the employee to be searched.
   * @returns {Promise<Employee | null>} A promise that resolves to the employee object, or null if not found.
   * @throws {NotFoundException} Throws an error if the employee is not found.
   */
  async findEmployeeByUsername(username: string): Promise<Employee | null> {
    try {
      const employee = await this.employeeModel.findOne({ username }).exec();
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new BadRequestException(`Error fetching employee by username: ${error.message}`);
    }
  }

  /**
   * Finds an employee by their ID.
   * @param {string | Types.ObjectId} id - The ID of the employee to be searched.
   * @returns {Promise<Employee | null>} A promise that resolves to the employee object, or null if not found.
   * @throws {BadRequestException} Throws an error if the ID format is invalid or if fetching fails.
   * @throws {NotFoundException} Throws an error if the employee is not found.
   */
  async findEmployeeById(id: string | Types.ObjectId): Promise<Employee | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
      }

      const employee = await this.employeeModel.findById(id).exec();

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      return employee;
    } catch (error) {
      throw new BadRequestException(`Error fetching employee by ID: ${error.message}`);
    }
  }

  /**
   * Updates an employee by their username.
   * @param {string} username - The username of the employee to be updated.
   * @param {UpdateEmployeeDto} updateEmployeeDto - The data transfer object containing updated employee details.
   * @returns {Promise<Employee>} A promise that resolves to the updated employee.
   * @throws {NotFoundException} Throws an error if the employee is not found.
   * @throws {BadRequestException} Throws an error if the update fails.
   */
  async updateEmployee(
    username: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      const employee = await this.employeeModel.findOneAndUpdate(
        { username },
        updateEmployeeDto,
        { new: true }, // Return the updated document
      );

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      return employee;
    } catch (error) {
      throw new BadRequestException(`Error updating employee: ${error.message}`);
    }
  }

  /**
   * Deletes an employee by their username.
   * @param {string} username - The username of the employee to be deleted.
   * @returns {Promise<string>} A promise that resolves to a success message.
   * @throws {NotFoundException} Throws an error if the employee is not found.
   * @throws {BadRequestException} Throws an error if the deletion fails.
   */
  async deleteEmployee(username: string): Promise<string> {
    try {
      const employee = await this.employeeModel.findOneAndDelete({ username });

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      return `Employee with username ${username} deleted successfully`;
    } catch (error) {
      throw new BadRequestException(`Error deleting employee: ${error.message}`);
    }
  }

  /**
   * Updates an employee by their ID.
   * @param {string} id - The ID of the employee to be updated.
   * @param {UpdateEmployeeDto} updateEmployeeDto - The data transfer object containing updated employee details.
   * @returns {Promise<Employee>} A promise that resolves to the updated employee.
   * @throws {NotFoundException} Throws an error if the employee is not found.
   * @throws {BadRequestException} Throws an error if the update fails.
   */
  async updateEmployeeById(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    try {
      const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
        id,
        updateEmployeeDto,
        { new: true },
      );

      if (!updatedEmployee) {
        throw new NotFoundException('Employee not found');
      }

      return updatedEmployee;
    } catch (error) {
      throw new BadRequestException(`Error updating employee: ${error.message}`);
    }
  }

  /**
   * Deletes an employee by their ID.
   * @param {string} id - The ID of the employee to be deleted.
   * @returns {Promise<void>} A promise that resolves when the employee is deleted.
   * @throws {NotFoundException} Throws an error if the employee is not found.
   * @throws {BadRequestException} Throws an error if the deletion fails.
   */
  async deleteEmployeeById(id: string): Promise<void> {
    try {
      const deletedEmployee = await this.employeeModel.findByIdAndDelete(id);

      if (!deletedEmployee) {
        throw new NotFoundException('Employee not found');
      }
    } catch (error) {
      throw new BadRequestException(`Error deleting employee: ${error.message}`);
    }
  }
}
