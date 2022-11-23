import { Genre } from '../../genres/entities/genre.entity';
import { Movie } from '../../movies/entities/movie.entity';

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie_genre' })
export class MovieGenre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.movieGenre, {
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @ManyToOne(() => Genre, (genre) => genre.movieGenre)
  genre: Genre;
}
