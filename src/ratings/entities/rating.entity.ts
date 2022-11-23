import { Movie } from '../../movies/entities/movie.entity';
import { Reviewer } from '../../reviewers/entities/reviewer.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ratings' })
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.ratings, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => Reviewer, (reviewer) => reviewer.ratings, {
    onDelete: 'CASCADE',
  })
  reviewer: Reviewer;

  @Column({ nullable: false, default: 5 })
  stars: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}

export class RatingTest extends Rating {
  constructor(rating?: Partial<Rating>) {
    super();
    this.id = rating.id;
    this.stars = rating.stars;
  }
}
