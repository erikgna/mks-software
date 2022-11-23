import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateGenreDto {
  @Length(3, 60)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 60, minLength: 3 })
  name: string;
}
