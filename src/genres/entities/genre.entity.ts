import { MovieGenre } from 'src/movies/entities/genre.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'genres' })
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre)
  movieGenre: MovieGenre[];
}
