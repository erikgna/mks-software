import { Director } from 'src/directors/entities/director.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Movie } from 'src/movies/entities/movie.entity';

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie_genre' })
export class MovieGenre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.movieGenre)
  movie: Movie;

  @ManyToOne(() => Genre, (genre) => genre.movieGenre)
  genre: Genre;
}
