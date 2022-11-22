import { Rating } from 'src/ratings/entities/rating.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'reviewers' })
export class Reviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];
}
