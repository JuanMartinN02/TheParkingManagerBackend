import { Module } from '@nestjs/common';
import { SysAdminService } from './sys-admin.service';
import { SysAdminController } from './sys-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysAdmin } from './entities/sys-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysAdmin])],
  controllers: [SysAdminController],
  providers: [SysAdminService],
  exports: [SysAdminService],
})
export class SysAdminModule {}
