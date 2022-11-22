import { IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  movie: string;

  @IsNotEmpty()
  reviewer: string;

  @IsNotEmpty()
  stars: number;
}
