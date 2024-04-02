import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config/dist';
import { Grenade } from './entities/grenade.entity';
import { t } from '@mikro-orm/core';

export interface ExtendedGrenade extends Grenade {
  viewCount: number;
  description: string;
  title: string;
  thumbnails: any;
}

@Injectable()
export class GrenadeService {
  constructor(
    @InjectRepository(Grenade)
    private readonly grenadeRepository: Repository<Grenade>,
    private readonly configService: ConfigService,
  ) {}

  async getVideoTutorial(startPositionId: string, endLocationId: string) {
    if (!startPositionId || !endLocationId) {
      throw new BadRequestException(
        'Start and end position IDs are required parameters.',
      );
    }

    const api = this.configService.get('YOUTUBE_API_KEY');
    if (!api) {
      throw new Error('YouTube API key is not configured.');
    }

    const findedVideo = await this.grenadeRepository.find({
      where: {
        endLocation: { id: endLocationId },
        startPosition: { id: startPositionId },
      },
    });

    const extendedResult = await Promise.all(
      findedVideo.map(async (el) => {
        const { videoId } = el;
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${api}&part=snippet,statistics`;

        try {
          const { data } = await axios.get(url);
          if (!data || !data.items || data.items.length === 0) {
            throw new Error(`No data found for video ID: ${videoId}`);
          }
          const { statistics, snippet } = data.items[0];
          const { description, title, thumbnails } = snippet;
          const { viewCount } = statistics;
          return {
            ...el,
            viewCount,
            description,
            title,
            thumbnails,
            videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          };
        } catch (error) {
          console.error(
            'Error while fetching data from YouTube Data API:',
            error,
          );
          throw error;
        }
      }),
    );

    return extendedResult;
    return 'qwe';
  }
}
