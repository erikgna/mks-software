import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'actors' })
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ nullable: false })
  gender: string;
}
