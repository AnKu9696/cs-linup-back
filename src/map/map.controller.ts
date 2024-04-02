import { MapService } from './map.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get(':map')
  async getEndLocationsByMap(
    @Param('map') map: string,
    @Query('type') type: string,
  ) {
    return this.mapService.getEndLocationsByMap(map, type);
  }

  @Get(':endLocationId/start-positions')
  async getStartPositions(@Param('endLocationId') endLocationId: string) {
    return this.mapService.getStartPositions(endLocationId);
  }
}
