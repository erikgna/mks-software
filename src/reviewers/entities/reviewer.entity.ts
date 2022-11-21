import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reviewers' })
export class Reviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}
