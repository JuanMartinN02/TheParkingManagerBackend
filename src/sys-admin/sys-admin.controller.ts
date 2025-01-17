import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { SysAdminService } from './sys-admin.service';
import { CreateSysAdminDto } from './dto/create-sys-admin.dto';
import { UpdateSysAdminDto } from './dto/update-sys-admin.dto';

@Controller('sysAdmin')
export class SysAdminController {
  constructor(private readonly sysAdminService: SysAdminService) {}

  @Post()
  create(@Body() CreateSysAdminDto: CreateSysAdminDto) {
    return this.sysAdminService.create(CreateSysAdminDto);
  }

  @Get()
  findAll() {
    return this.sysAdminService.findAll();
  }

  @Get(':sysAdmin_id')
  findOne(@Param('sysAdmin_id') sysAdmin_id: number) {
    return this.sysAdminService.findOne(+sysAdmin_id);
  }

  @Put(':sysAdmin_id') 
  async update(@Param('sysAdmin_id', ParseIntPipe) sysAdmin_id: number, @Body() updateSysAdminDto: UpdateSysAdminDto) {
    await this.sysAdminService.update(sysAdmin_id, updateSysAdminDto);
  }

  @Delete(':sysAdmin_id')
  remove(@Param('sysAdmin_id', ParseIntPipe) sysAdmin_id: number) {
    return this.sysAdminService.remove(sysAdmin_id);
}
}
