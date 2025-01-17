import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTowerDto } from './dto/create-tower.dto';
import { UpdateTowerDto } from './dto/update-tower.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tower } from './entities/tower.entity';
import { Repository } from 'typeorm';
import { updateTowerParam } from './types/types';

@Injectable()
export class TowerService {
  constructor(
    @InjectRepository(Tower)
    private readonly towerRepository: Repository<Tower>,
  ){}

  async create(createTowerDto: CreateTowerDto): Promise<Tower> {
    const tower = this.towerRepository.create(createTowerDto);
    return this.towerRepository.save(tower)
  }

  async findAll(): Promise<Tower[]> {
    return this.towerRepository.find()
  }

  async findOne(tower_id: number): Promise<Tower> {
    const tower = await this.towerRepository.findOne({where: { tower_id: tower_id }});
    if(!tower){
      throw new NotFoundException(`Tower with ID ${tower_id} not found`);
    }
    return tower;
  }

  update(tower_id: number, updateTowerDetails: updateTowerParam) {
    return this.towerRepository.update({ tower_id }, { ...updateTowerDetails});
  }

  async remove(tower_id: number): Promise <void> {
    const tower = await this.findOne(tower_id);
    await this.towerRepository.remove(tower)
  }
}
