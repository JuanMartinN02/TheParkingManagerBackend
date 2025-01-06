import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Property } from 'src/property/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Property])],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
