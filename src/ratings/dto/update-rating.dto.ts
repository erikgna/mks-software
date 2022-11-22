import { IsNotEmpty } from 'class-validator';

export class UpdateRatingDto {
  @IsNotEmpty()
  stars: number;
}
