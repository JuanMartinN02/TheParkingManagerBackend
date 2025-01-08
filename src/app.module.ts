import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './property/property.module';
import { Property } from './property/entities/property.entity';
import { ManagerModule } from './manager/manager.module';
import { Manager } from './manager/entities/manager.entity';
import { ResidentModule } from './resident/resident.module';
import { Resident } from './resident/entities/resident.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'AdminJuan',
      password: 'Admin0204',
      database: 'the_parking_manager_db',
      entities: [Property, Manager, Resident],
      synchronize: true,
      dropSchema: true,
    }),
    PropertyModule,
    ManagerModule,
    ResidentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
