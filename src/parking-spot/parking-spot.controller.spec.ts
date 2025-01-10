import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSpotController } from './parking-spot.controller';
import { ParkingSpotService } from './parking-spot.service';

describe('ParkingSpotController', () => {
  let controller: ParkingSpotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSpotController],
      providers: [ParkingSpotService],
    }).compile();

    controller = module.get<ParkingSpotController>(ParkingSpotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
