import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSysAdminDto } from './dto/create-sys-admin.dto';
import { UpdateSysAdminDto } from './dto/update-sys-admin.dto';
import { SysAdmin } from './entities/sys-admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateSysAdminParam } from './types/types';

@Injectable()
export class SysAdminService {
  constructor(
    @InjectRepository(SysAdmin)
    private readonly sysAdminRepository: Repository<SysAdmin>,
  ){}

  async create(createSysAdminDto: CreateSysAdminDto): Promise<SysAdmin> {
    const sysAdmin = this.sysAdminRepository.create(createSysAdminDto);
    return this.sysAdminRepository.save(sysAdmin)
  }

  async findAll(): Promise<SysAdmin[]> {
    return this.sysAdminRepository.find()
  }

  async findOne(sysAdmin_id: number): Promise<SysAdmin> {
    const sysAdmin = await this.sysAdminRepository.findOne({where: { sysAdmin_id: sysAdmin_id }});
    if(!sysAdmin){
      throw new NotFoundException(`sysAdmin with ID ${sysAdmin_id} not found`);
    }
    return sysAdmin;
  }

  update(sysAdmin_id: number, updateSysAdmunDetails: updateSysAdminParam) {
    return this.sysAdminRepository.update({ sysAdmin_id }, { ...updateSysAdmunDetails});
  }

  async remove(sysAdmin_id: number): Promise <void> {
    const sysAdmin = await this.findOne(sysAdmin_id);
    await this.sysAdminRepository.remove(sysAdmin)
  }
}
