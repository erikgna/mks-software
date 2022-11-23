import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateRatingDto {
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({ maximum: 5, minimum: 1 })
  stars: number;
}
