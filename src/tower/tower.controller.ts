import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { TowerService } from './tower.service';
import { CreateTowerDto } from './dto/create-tower.dto';
import { UpdateTowerDto } from './dto/update-Tower.dto';

@Controller('towers')
export class TowerController {
  constructor(private readonly towerService: TowerService) {}

  @Post()
  create(@Body() createTowerDto: CreateTowerDto) {
    return this.towerService.create(createTowerDto);
  }

  @Get()
  findAll() {
    return this.towerService.findAll();
  }

  @Get(':tower_id')
  findOne(@Param('tower_id') tower_id: number) {
    return this.towerService.findOne(+tower_id);
  }

  @Put(':tower_id') 
  async update(@Param('tower_id', ParseIntPipe) tower_id: number, @Body() updateTowerDto: UpdateTowerDto) {
    await this.towerService.update(tower_id, updateTowerDto);
  }

  @Delete(':tower_id')
  remove(@Param('tower_id', ParseIntPipe) tower_id: number) {
    return this.towerService.remove(tower_id);
}
}
