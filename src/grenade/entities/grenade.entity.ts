import { EndLocation } from 'src/map/entities/endLocation.entity';
import { StartPosition } from 'src/map/entities/startPosition.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Grenade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EndLocation)
  @JoinColumn({ name: 'end_location_id' })
  endLocation: EndLocation;

  @ManyToOne(() => StartPosition)
  @JoinColumn({ name: 'start_position_id' })
  startPosition: StartPosition;

  @Column({ name: 'team_side' })
  teamSide: string;

  @Column({ name: 'video_id' })
  videoId: string;
}
