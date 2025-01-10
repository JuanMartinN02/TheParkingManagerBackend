import { Module } from '@nestjs/common';
import { ParkingSpotService } from './parking-spot.service';
import { ParkingSpotController } from './parking-spot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './entities/parking-spot.entity';
import { Property } from 'src/property/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpot, Property])],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
  exports: [ParkingSpotService]
})
export class ParkingSpotModule {}
