import { Test, TestingModule } from '@nestjs/testing';
import { GrenadeService } from './grenade.service';

describe('GrenadeService', () => {
  let service: GrenadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrenadeService],
    }).compile();

    service = module.get<GrenadeService>(GrenadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
