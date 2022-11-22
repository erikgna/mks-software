import { MovieDirection } from 'src/movies/entities/direction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'directors' })
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @OneToMany(() => MovieDirection, (movieDirections) => movieDirections.movie)
  movieDirection: MovieDirection[];
}
