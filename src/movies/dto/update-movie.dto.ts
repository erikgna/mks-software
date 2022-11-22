import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
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
}
