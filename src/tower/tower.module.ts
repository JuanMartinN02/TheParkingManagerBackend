import { Module } from '@nestjs/common';
import { TowerService } from './tower.service';
import { TowerController } from './tower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tower } from './entities/tower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tower])],
  controllers: [TowerController],
  providers: [TowerService],
  exports: [TowerService],
})
export class TowerModule {}
