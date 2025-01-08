import { CreateResidentDto } from './dto/create-resident.dto';
import { Resident } from './entities/resident.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from 'src/property/entities/property.entity';
import { updateResidentParam } from './utils/types';

@Injectable()
export class ResidentService {
  constructor(
      @InjectRepository(Resident)
      private readonly ResidentRepository: Repository<Resident>,
      @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>,
    ){}
  
    async create(
      property_id: number,
      createResidentDto: CreateResidentDto): Promise<Resident> {
      //funcion que encuentra la propiedad a la que linkear el Resident
      const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
      if(!property)
        throw new HttpException(
          'Property not found. Cannot create Resident!',
          HttpStatus.BAD_REQUEST,
        );
      const newResident = this.ResidentRepository.create({
        ...createResidentDto,
        property,
      });
      return this.ResidentRepository.save(newResident);
  
    }
  
    // Find all Residents for a given property
    async findAll(property_id: number): Promise<Resident[]> {
      const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
      if(!property)
        throw new HttpException(
          'Property not found. Cannot create Resident!',
          HttpStatus.BAD_REQUEST,
        );
      return this.ResidentRepository.find({where: { property }})
    }
  
    // Find a specific Resident for a given property
    async findOne(
      property_id: number,
      resident_id: number,
    ): Promise<Resident> {
      const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
      if(!property)
        throw new HttpException(
          'Property not found. Cannot create Resident!',
          HttpStatus.BAD_REQUEST,
        );
  
      const Resident = await this.ResidentRepository.findOne({
        where: {resident_id, property},
        relations: ['property'],
      });
      if(!Resident)
        throw new HttpException(
          'Resident not found.',
          HttpStatus.NOT_FOUND,
        );
        
  
      return Resident;
    }
  
    // Update a specific Resident's details
    update(resident_id: number, updateResidentDetails: updateResidentParam) {
      return this.ResidentRepository.update({ resident_id }, { ...updateResidentDetails});
    }
  
    // Delete a specific Resident
    async remove(
      property_id: number,
      resident_id: number,
    ): Promise<void> {
      const Resident = await this.findOne(property_id, resident_id);
      await this.ResidentRepository.remove(Resident);
    }

    // Create residents in bulk
    async bulkCreateResidents(
      property_id: number,
      createResidentsDto: CreateResidentDto[],
    ): Promise<Resident[]> {
      const property = await this.propertyRepository.findOne({ where: { property_id } });
    
      if (!property) {
        throw new HttpException('Property not found. Cannot create residents!', HttpStatus.BAD_REQUEST);
      }
    
      // Map each resident DTO to a new Resident entity and save them
      const residents = createResidentsDto.map((residentDto) => {
        const newResident = this.ResidentRepository.create({
          ...residentDto,
          property,
        });
        return this.ResidentRepository.save(newResident); // Save each resident
      });
    
      return Promise.all(residents); // Wait for all residents to be saved
    }
}
