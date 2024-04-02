import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StartPosition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'callout_name' })
  calloutName: string;

  @Column()
  map: string;

  @Column({ type: 'jsonb', array: true })
  position: { x: number; y: number }[];

  @Column({ name: 'label_position', type: 'jsonb' })
  labelPosition: { x: number; y: number };
}
