import { Rating } from '../../ratings/entities/rating.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { MovieCast } from './cast.entity';
import { MovieDirection } from './direction.entity';
import { MovieGenre } from './genre.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false })
  year: string;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: false })
  language: string;

  @Column({ type: 'date', nullable: false })
  releaseDate: Date;

  @Column({ nullable: false })
  releaseCountry: string;

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];

  @OneToMany(() => MovieDirection, (movieDirection) => movieDirection.movie)
  movieDirection: MovieDirection[];

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.movie)
  movieGenre: MovieGenre[];

  @OneToMany(() => MovieCast, (movieCast) => movieCast.movie)
  movieCast: MovieCast[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @BeforeInsert()
  transformDate() {
    this.releaseDate = new Date(this.releaseDate);
  }
}
