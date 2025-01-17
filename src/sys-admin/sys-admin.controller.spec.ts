import { Test, TestingModule } from '@nestjs/testing';
import { SysAdminController } from './sys-admin.controller';
import { SysAdminService } from './sys-admin.service';

describe('SysAdminController', () => {
  let controller: SysAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysAdminController],
      providers: [SysAdminService],
    }).compile();

    controller = module.get<SysAdminController>(SysAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
