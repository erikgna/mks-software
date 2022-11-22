import { Movie } from 'src/movies/entities/movie.entity';
import { Reviewer } from 'src/reviewers/entities/reviewer.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ratings' })
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie: Movie;

  @ManyToOne(() => Reviewer, (reviewer) => reviewer.ratings)
  reviewer: Reviewer;

  @Column({ nullable: false, default: 5 })
  stars: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
