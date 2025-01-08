import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ResidentController } from './resident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident } from './entities/resident.entity';
import { Property } from 'src/property/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resident, Property])],
  controllers: [ResidentController],
  providers: [ResidentService],
  exports: [ResidentService],
})
export class ResidentModule {}
