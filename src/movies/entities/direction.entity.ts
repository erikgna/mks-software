import { Director } from '../../directors/entities/director.entity';
import { Movie } from '../../movies/entities/movie.entity';

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie_direction' })
export class MovieDirection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.movieDirection, {
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @ManyToOne(() => Director, (director) => director.movieDirection)
  director: Director;
}
