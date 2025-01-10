import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParkingSpotService } from './parking-spot.service';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';

@Controller('properties')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

   @Post(':property_id/parkingSpots')
    create(
        @Param('property_id', ParseIntPipe) property_id: number,
        @Body() CreateParkingSpotDto: CreateParkingSpotDto,
      ) {
        return this.parkingSpotService.create(property_id, CreateParkingSpotDto);
    }
  
    @Get(':property_id/parkingSpots')
    findAll(@Param('property_id', ParseIntPipe) property_id: number) {
      return this.parkingSpotService.findAll(property_id);
    }
  
    @Get(':property_id/parkingSpots/:parking_id')
    findOne(
      @Param('property_id', ParseIntPipe) property_id: number,
      @Param('parking_id', ParseIntPipe) parking_id: number,
    ) {
      return this.parkingSpotService.findOne(property_id, parking_id);
    }
  
    @Patch(':property_id/parkingSpots/:parking_id')
    update(
      @Param('parking_id', ParseIntPipe) parking_id: number,
      @Body() CreateParkingSpotDto: CreateParkingSpotDto,
    ) {
      return this.parkingSpotService.update(parking_id, CreateParkingSpotDto);
    }
  
    @Delete(':property_id/parkingSpots/:parking_id')
    remove(
      @Param('property_id', ParseIntPipe) property_id: number,
      @Param('parking_id', ParseIntPipe) parking_id: number,
    ) {
      return this.parkingSpotService.remove(property_id, parking_id);
    }
  
    @Post(':property_id/parkingSpots/bulk')
    async bulkCreateParkingSpots(
      @Param('property_id', ParseIntPipe) property_id: number,
      @Body() CreateParkingSpotDto: CreateParkingSpotDto[],
    ) {
      return this.parkingSpotService.bulkCreateParkingSpots(property_id, CreateParkingSpotDto);
    }
}
