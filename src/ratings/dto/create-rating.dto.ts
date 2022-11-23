import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'ID de um filme' })
  movie: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'ID de um analista' })
  reviewer: string;

  @Min(1)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({ maximum: 5, minimum: 1 })
  stars: number;
}
