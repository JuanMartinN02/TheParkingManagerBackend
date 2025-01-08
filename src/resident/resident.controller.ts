import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';

@Controller('properties')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post(':property_id/residents')
  create(
      @Param('property_id', ParseIntPipe) property_id: number,
      @Body() CreateResidentDto: CreateResidentDto,
    ) {
      return this.residentService.create(property_id, CreateResidentDto);
  }

  @Get(':property_id/residents')
  findAll(@Param('property_id', ParseIntPipe) property_id: number) {
    return this.residentService.findAll(property_id);
  }

  @Get(':property_id/residents/:resident_id')
  findOne(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Param('resident_id', ParseIntPipe) resident_id: number,
  ) {
    return this.residentService.findOne(property_id, resident_id);
  }

  @Patch(':property_id/residents/:resident_id')
  update(
    @Param('resident_id', ParseIntPipe) resident_id: number,
    @Body() CreateResidentDto: CreateResidentDto,
  ) {
    return this.residentService.update(resident_id, CreateResidentDto);
  }

  @Delete(':property_id/residents/:resident_id')
  remove(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Param('resident_id', ParseIntPipe) resident_id: number,
  ) {
    return this.residentService.remove(property_id, resident_id);
  }

  @Post(':property_id/residents/bulk')
  async bulkCreateResidents(
    @Param('property_id', ParseIntPipe) property_id: number,
    @Body() createResidentsDto: CreateResidentDto[],
  ) {
    return this.residentService.bulkCreateResidents(property_id, createResidentsDto);
  }
}
