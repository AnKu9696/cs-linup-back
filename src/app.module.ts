import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndLocation } from './map/entities/endLocation.entity';
import { Grenade } from './grenade/entities/grenade.entity';
import { GrenadeController } from './grenade/grenade.controller';
import { GrenadeService } from './grenade/grenade.service';
import { MapController } from './map/map.controller';
import { MapService } from './map/map.service';
import { StartPosition } from './map/entities/startPosition.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([EndLocation, StartPosition, Grenade]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, GrenadeController, MapController],
  providers: [AppService, GrenadeService, MapService],
})
export class AppModule {}
