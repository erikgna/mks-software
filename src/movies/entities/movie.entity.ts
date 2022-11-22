import { Rating } from 'src/ratings/entities/rating.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { MovieCast } from './cast.entity';
import { MovieDirection } from './direction.entity';
import { MovieGenre } from './genre.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  year: string;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: false })
  language: string;

  @Column({ nullable: false })
  releaseDate: string;

  @Column({ nullable: false })
  releaseCountry: string;

  @OneToMany(() => Rating, (rating) => rating.movie, { onDelete: 'CASCADE' })
  ratings: Rating[];

  @OneToMany(() => MovieDirection, (movieDirection) => movieDirection.movie, {
    onDelete: 'CASCADE',
  })
  movieDirection: MovieDirection[];

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.movie, {
    onDelete: 'CASCADE',
  })
  movieGenre: MovieGenre[];

  @OneToMany(() => MovieCast, (movieCast) => movieCast.movie, {
    onDelete: 'CASCADE',
  })
  movieCast: MovieCast[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
