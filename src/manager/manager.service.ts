import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';
import { updateManagerParam } from './utils/types';
import { Property } from 'src/property/entities/property.entity';

@Injectable()
export class ManagerService {

  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ){}

  async create(
    property_id: number,
    createManagerDto: CreateManagerDto): Promise<Manager> {
    //funcion que encuentra la propiedad a la que linkear el manager
    const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
    if(!property)
      throw new HttpException(
        'Property not found. Cannot create manager!',
        HttpStatus.BAD_REQUEST,
      );
    const newManager = this.managerRepository.create({
      ...createManagerDto,
      property,
    });
    return this.managerRepository.save(newManager);

  }

  // Find all managers for a given property
  async findAll(property_id: number): Promise<Manager[]> {
    const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
    if(!property)
      throw new HttpException(
        'Property not found. Cannot create manager!',
        HttpStatus.BAD_REQUEST,
      );
    return this.managerRepository.find({where: { property }})
  }

  // Find a specific manager for a given property
  async findOne(
    property_id: number,
    manager_id: number,
  ): Promise<Manager> {
    const property = await this.propertyRepository.findOne({where: { property_id: property_id }});
    if(!property)
      throw new HttpException(
        'Property not found. Cannot create manager!',
        HttpStatus.BAD_REQUEST,
      );

    const manager = await this.managerRepository.findOne({
      where: {manager_id, property},
      relations: ['property'],
    });
    if(!manager)
      throw new HttpException(
        'Manager not found.',
        HttpStatus.NOT_FOUND,
      );
      

    return manager;
  }

  // Update a specific manager's details
  update(manager_id: number, updateManagerDetails: updateManagerParam) {
    return this.managerRepository.update({ manager_id }, { ...updateManagerDetails});
  }

  // Delete a specific manager
  async remove(
    property_id: number,
    manager_id: number,
  ): Promise<void> {
    const manager = await this.findOne(property_id, manager_id);
    await this.managerRepository.remove(manager);
  }

  // Creates multiple managers
  async bulkCreateManagers(
    property_id: number,
    createManagersDto: CreateManagerDto[],
  ): Promise<Manager[]> {
    const property = await this.propertyRepository.findOne({ where: { property_id } });
  
    if (!property) {
      throw new HttpException('Property not found. Cannot create managers!', HttpStatus.BAD_REQUEST);
    }
  
    // Map each manager DTO to a new Manager entity and save them
    const managers = createManagersDto.map((managerDto) => {
      const newManager = this.managerRepository.create({
        ...managerDto,
        property,
      });
      return this.managerRepository.save(newManager); // Save each manager
    });
  
    return Promise.all(managers); // Wait for all managers to be saved
  }
}
