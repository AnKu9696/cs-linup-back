import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Grenade } from 'src/grenade/entities/grenade.entity';
import { DataSource, Repository } from 'typeorm';
import { EndLocation } from './entities/endLocation.entity';
import { StartPosition } from './entities/startPosition.entity';

export interface ExtendedEndLocation extends EndLocation {
  count: number;
}

export interface ExtendedStartPosition extends StartPosition {
  count: number;
}

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(EndLocation)
    private readonly endLocationRepository: Repository<EndLocation>,
    @InjectRepository(Grenade)
    private readonly grenadeRepository: Repository<Grenade>,
    @InjectRepository(StartPosition)
    private readonly startPositionRepository: Repository<StartPosition>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getEndLocationsByMap(
    map: string,
    type: string,
  ): Promise<ExtendedEndLocation[]> {
    if (!map || !type) {
      throw new BadRequestException('Map and type are required parameters.');
    }
    const endLocations = await this.endLocationRepository.find({
      where: { map, type },
    });

    const extendedEndLocations = endLocations.map(async (endLocation) => {
      const grenadeCount = await this.grenadeRepository.count({
        where: { endLocation: { id: endLocation.id } },
      });

      return {
        ...endLocation,
        count: grenadeCount,
      };
    });

    return Promise.all(extendedEndLocations);
  }

  async getStartPositions(endLocationId: string): Promise<StartPosition[]> {
    if (!endLocationId) {
      throw new BadRequestException(`${endLocationId}`);
    }

    const startPositions = await this.dataSource
      .createQueryBuilder()
      .from(Grenade, 'grenade')
      .where({ endLocation: { id: endLocationId } })
      .select('DISTINCT start_position_id, COUNT(*) as count')
      .groupBy('start_position_id')
      .cache(true)
      .getRawMany();

    const extendedStartPositions = startPositions.map(
      async ({ start_position_id, count }) => {
        const startPosition = await this.startPositionRepository.findOne({
          where: { id: start_position_id },
        });
        return {
          ...startPosition,
          count: parseInt(count),
        };
      },
    );

    return Promise.all(extendedStartPositions);
  }
}
