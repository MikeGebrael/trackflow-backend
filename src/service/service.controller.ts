import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // Create a new service
  @UseGuards(JwtAuthGuard)
  @Post()
  async createService(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceService.createService(createServiceDto);
  }

  // Get all services
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllServices(): Promise<Service[]> {
    return this.serviceService.getAllServices();
  }

  // Get a service by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getServiceById(@Param('id') id: string): Promise<Service> {
    return this.serviceService.getServiceById(id);
  }

  // Update a service
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  // Delete a service
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteService(@Param('id') id: string): Promise<Service> {
    return this.serviceService.deleteService(id);
  }
}
