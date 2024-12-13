import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, BadRequestException } from '@nestjs/common'; // Import necessary decorators from NestJS
import { EmployeeService } from './employee.service'; // Import the EmployeeService to interact with employee data
import { Employee } from './employee.schema'; // Import Employee schema to define the return type
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto'; // Import DTOs for data validation
import { JwtAuthGuard } from '../auth/auth.guard';  // Import the JwtAuthGuard to protect routes

/**
 * The EmployeeController is responsible for handling HTTP requests related to employees,
 * including retrieving, creating, updating, and deleting employee data.
 * This controller uses the EmployeeService to interact with employee data in the database.
 */
@Controller('employees') // This controller handles requests to the 'employees' route
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  /**
   * Fetch all employees.
   * This route is protected by the JwtAuthGuard to ensure only authenticated users can access it.
   * @returns {Promise<Employee[]>} A list of all employees.
   */
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard to ensure the user is authenticated
  @Get()
  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeService.findAll(); // Fetch all employees using the EmployeeService
    } catch (error) {
      throw new BadRequestException(error.message); // Handle any errors during the process
    }
  }

  /**
   * Create a new employee.
   * This route is protected by the JwtAuthGuard to ensure only authenticated users can access it.
   * @param createEmployeeDto - The data transfer object containing the new employee's information.
   * @returns {Promise<Employee>} The newly created employee object.
   */
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      return await this.employeeService.createEmployee(createEmployeeDto); // Create a new employee using the EmployeeService
    } catch (error) {
      throw new BadRequestException(error.message); // Handle any errors during the creation process
    }
  }

  /**
   * Update an existing employee by ID.
   * This route is protected by the JwtAuthGuard to ensure only authenticated users can access it.
   * @param id - The ID of the employee to be updated.
   * @param updateEmployeeDto - The data transfer object containing the updated employee information.
   * @returns {Promise<Employee>} The updated employee object.
   */
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @Put(':id')
  async update(
    @Param('id') id: string, // Retrieve the ID of the employee from the route parameter
    @Body() updateEmployeeDto: UpdateEmployeeDto, // Retrieve the updated employee data from the body
  ): Promise<Employee> {
    try {
      return await this.employeeService.updateEmployeeById(id, updateEmployeeDto); // Update the employee by ID using the EmployeeService
    } catch (error) {
      throw new BadRequestException(error.message); // Handle any errors during the update process
    }
  }

  /**
   * Delete an employee by ID.
   * This route is protected by the JwtAuthGuard to ensure only authenticated users can access it.
   * @param id - The ID of the employee to be deleted.
   * @returns {Promise<{ message: string }>} A success message after the employee is deleted.
   */
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.employeeService.deleteEmployeeById(id); // Delete the employee by ID using the EmployeeService
      return { message: `Employee with ID ${id} deleted successfully` }; // Return a success message
    } catch (error) {
      throw new BadRequestException(error.message); // Handle any errors during the deletion process
    }
  }
}
