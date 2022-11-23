import { MovieCast } from '../../movies/entities/cast.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'actors' })
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ nullable: false })
  gender: string;

  @OneToMany(() => MovieCast, (movieCast) => movieCast.actor)
  movieCast: MovieCast[];
}

export class ActorTest extends Actor {
  constructor(actor?: Partial<Actor>) {
    super();
    this.id = actor.id;
    this.firstName = actor.firstName;
    this.lastName = actor.lastName;
    this.gender = actor.gender;
  }
}
