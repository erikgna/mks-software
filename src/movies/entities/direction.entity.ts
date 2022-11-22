import { Director } from 'src/directors/entities/director.entity';
import { Movie } from 'src/movies/entities/movie.entity';

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie_direction' })
export class MovieDirection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.movieDirection)
  movie: Movie;

  @ManyToOne(() => Director, (director) => director.movieDirection)
  director: Director;
}
