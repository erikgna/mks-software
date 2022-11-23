import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  year: string;

  @IsNotEmpty()
  @ApiProperty()
  time: string;

  @IsNotEmpty()
  @ApiProperty()
  language: string;

  @IsNotEmpty()
  @ApiProperty()
  releaseDate: string;

  @IsNotEmpty()
  @ApiProperty()
  releaseCountry: string;
}
