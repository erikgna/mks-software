import { Rating } from '../../ratings/entities/rating.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'reviewers' })
export class Reviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];
}

export class ReviewerTest extends Reviewer {
  constructor(reviewer?: Partial<Reviewer>) {
    super();
    this.id = reviewer.id;
    this.name = reviewer.name;
  }
}
