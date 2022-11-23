import { MovieGenre } from '../../movies/entities/genre.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'genres' })
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre)
  movieGenre: MovieGenre[];
}

export class GenreTest extends Genre {
  constructor(genre?: Partial<Genre>) {
    super();
    this.id = genre.id;
    this.name = genre.name;
  }
}
