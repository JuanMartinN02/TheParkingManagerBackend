import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Controller('properties')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  //Create a manager for a property
  @Post(':property_id/managers')
  create(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Body() createManagerDto: CreateManagerDto,
  ) {
    return this.managerService.create(property_id, createManagerDto);
  }

  // Get all managers for a specific property
  @Get(':property_id/managers') 
  findAll(@Param('property_id', ParseIntPipe) property_id: number) {
    return this.managerService.findAll(property_id);
  }

  // Get a specific manager for a specific property
  @Get(':property_id/managers/:manager_id') 
  findOne(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Param('manager_id', ParseIntPipe) manager_id: number,
  ) {
    return this.managerService.findOne(property_id, manager_id);
  }

  // Update a specific manager for a property
  @Patch(':property_id/managers/:manager_id')
  update(
    @Param('manager_id', ParseIntPipe) manager_id: number,
    @Body() updateManagerDto: UpdateManagerDto
  ) {
    return this.managerService.update(manager_id, updateManagerDto);
  }

  // Delete a specific manager for a property
  @Delete(':property_id/managers/:manager_id') 
  remove(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Param('manager_id', ParseIntPipe) manager_id: number
  ) {
    return this.managerService.remove(property_id, manager_id);
  }

  // Creates multiple managers
  @Post(':property_id/managers/bulk')
  async bulkCreateManagers(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Body() createManagersDto: CreateManagerDto[],
  ) {
    return this.managerService.bulkCreateManagers(property_id, createManagersDto);
  }
}
