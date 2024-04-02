import { GrenadeController } from './grenade.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('VideoTutorialController', () => {
  let controller: GrenadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrenadeController],
    }).compile();

    controller = module.get<GrenadeController>(GrenadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
