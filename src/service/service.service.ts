import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

/**
 * ServiceService handles the business logic for managing services.
 * It interacts with the Service model to perform CRUD operations on service data.
 */
@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>, // Injecting the service model for interaction with the database
  ) {}

  /**
   * Creates a new service.
   * @param createServiceDto - The data transfer object containing details of the new service.
   * @returns The newly created service.
   * @throws BadRequestException if the service creation fails.
   */
  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const { name, description, rate } = createServiceDto; // Extract data from DTO
      const newService = new this.serviceModel({ name, description, rate });
      return await newService.save(); // Save the new service to the database
    } catch (error) {
      throw new BadRequestException(`Error creating service: ${error.message}`);
    }
  }

  /**
   * Retrieves all services.
   * @returns An array of all services.
   * @throws BadRequestException if the retrieval fails.
   */
  async getAllServices(): Promise<Service[]> {
    try {
      return await this.serviceModel.find().exec(); // Fetch all services from the database
    } catch (error) {
      throw new BadRequestException(`Error fetching services: ${error.message}`);
    }
  }

  /**
   * Retrieves a service by its ID.
   * @param id - The ID of the service to retrieve.
   * @returns The service object if found.
   * @throws BadRequestException if the retrieval fails.
   */
  async getServiceById(id: string): Promise<Service> {
    try {
      const service = await this.serviceModel.findById(id).exec();
      if (!service) {
        throw new BadRequestException('Service not found');
      }
      return service; // Return the found service
    } catch (error) {
      throw new BadRequestException(`Error fetching service: ${error.message}`);
    }
  }

  /**
   * Updates an existing service by ID.
   * @param id - The ID of the service to update.
   * @param updateServiceDto - The data transfer object containing updated service details.
   * @returns The updated service.
   * @throws BadRequestException if the update fails.
   */
  async updateService(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    try {
      const { name, description, rate } = updateServiceDto; // Extract data from DTO
      const updatedService = await this.serviceModel.findByIdAndUpdate(
        id,
        { name, description, rate }, // Update fields
        { new: true }, // Return the updated document
      ).exec();

      if (!updatedService) {
        throw new BadRequestException('Service not found');
      }

      return updatedService; // Return the updated service
    } catch (error) {
      throw new BadRequestException(`Error updating service: ${error.message}`);
    }
  }

  /**
   * Deletes a service by ID.
   * @param id - The ID of the service to delete.
   * @returns The deleted service.
   * @throws BadRequestException if the deletion fails.
   */
  async deleteService(id: string): Promise<Service> {
    try {
      const deletedService = await this.serviceModel.findByIdAndDelete(id).exec();
      if (!deletedService) {
        throw new BadRequestException('Service not found');
      }
      return deletedService; // Return the deleted service
    } catch (error) {
      throw new BadRequestException(`Error deleting service: ${error.message}`);
    }
  }
}
