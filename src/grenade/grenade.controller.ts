import { Controller, Get, Param, Query } from '@nestjs/common';
import { GrenadeService } from './grenade.service';

@Controller()
export class GrenadeController {
  constructor(private readonly grenadeService: GrenadeService) {}

  @Get('/grenade')
  async getEndLocationsByMap(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.grenadeService.getVideoTutorial(start, end);
  }
}
