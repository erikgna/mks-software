import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  releaseDate: string;

  @IsNotEmpty()
  releaseCountry: string;

  @IsNotEmpty()
  directorsID: string[];

  @IsNotEmpty()
  castsID: {
    role: string;
    actorID: string;
  }[];

  @IsNotEmpty()
  genresID: string[];
}
