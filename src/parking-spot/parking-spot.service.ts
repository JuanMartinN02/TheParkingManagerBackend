import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto';
import { UpdateParkingSpotDto } from './dto/update-parking-spot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/property/entities/property.entity';
import { ParkingSpot } from './entities/parking-spot.entity';
import { Repository } from 'typeorm';
import { updateParkingSpotParam } from './utils/types';

@Injectable()
export class ParkingSpotService {
  constructor(
    @InjectRepository(ParkingSpot)
    private readonly ParkingSpotRepository: Repository<ParkingSpot>,
    
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(
        property_id: number,
        createParkingSpotDto: CreateParkingSpotDto): Promise<ParkingSpot> {
        //funcion que encuentra la propiedad a la que linkear el ParkingSpot
        const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
        if(!property)
          throw new HttpException(
            'Property not found. Cannot create ParkingSpot!',
            HttpStatus.BAD_REQUEST,
          );
        const newParkingSpot = this.ParkingSpotRepository.create({
          ...createParkingSpotDto,
          property,
        });
        return this.ParkingSpotRepository.save(newParkingSpot);
    
      }
    
      // Find all ParkingSpots for a given property
      async findAll(property_id: number): Promise<ParkingSpot[]> {
        const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
        if(!property)
          throw new HttpException(
            'Property not found. Cannot create ParkingSpot!',
            HttpStatus.BAD_REQUEST,
          );
        return this.ParkingSpotRepository.find({where: { property }})
      }
    
      // Find a specific ParkingSpot for a given property
      async findOne(
        property_id: number,
        parking_id: number,
      ): Promise<ParkingSpot> {
        const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
        if(!property)
          throw new HttpException(
            'Property not found. Cannot create ParkingSpot!',
            HttpStatus.BAD_REQUEST,
          );
    
        const ParkingSpot = await this.ParkingSpotRepository.findOne({
          where: {parking_id, property},
          relations: ['property'],
        });
        if(!ParkingSpot)
          throw new HttpException(
            'ParkingSpot not found.',
            HttpStatus.NOT_FOUND,
          );
          
    
        return ParkingSpot;
      }
    
      // Update a specific ParkingSpot's details
      update(parking_id: number, updateParkingSpotDetails: updateParkingSpotParam) {
        return this.ParkingSpotRepository.update({ parking_id }, { ...updateParkingSpotDetails});
      }
    
      // Delete a specific ParkingSpot
      async remove(
        property_id: number,
        parking_id: number,
      ): Promise<void> {
        const ParkingSpot = await this.findOne(property_id, parking_id);
        await this.ParkingSpotRepository.remove(ParkingSpot);
      }
  
      // Create ParkingSpots in bulk
      async bulkCreateParkingSpots(
        property_id: number,
        createParkingSpotsDto: CreateParkingSpotDto[],
      ): Promise<ParkingSpot[]> {
        const property = await this.propertyRepository.findOne({ where: { property_id } });
      
        if (!property) {
          throw new HttpException('Property not found. Cannot create ParkingSpots!', HttpStatus.BAD_REQUEST);
        }
      
        // Map each ParkingSpot DTO to a new ParkingSpot entity and save them
        const ParkingSpots = createParkingSpotsDto.map((ParkingSpotDto) => {
          const newParkingSpot = this.ParkingSpotRepository.create({
            ...ParkingSpotDto,
            property,
          });
          return this.ParkingSpotRepository.save(newParkingSpot); // Save each ParkingSpot
        });
      
        return Promise.all(ParkingSpots); // Wait for all ParkingSpots to be saved
      }
}
