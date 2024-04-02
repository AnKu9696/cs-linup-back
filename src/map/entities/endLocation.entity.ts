import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EndLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'callout_name' })
  calloutName: string;

  @Column()
  map: string;

  @Column({ type: 'jsonb' })
  position: { x: number; y: number };

  @Column()
  type: string;
}
