import { Actor } from '../../actors/entities/actor.entity';
import { Movie } from '../../movies/entities/movie.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie_cast' })
export class MovieCast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.movieCast, {
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @ManyToOne(() => Actor, (actor) => actor.movieCast)
  actor: Actor;

  @Column({ nullable: false })
  role: string;
}
