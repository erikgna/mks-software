import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateReviewerDto {
  @Length(3, 60)
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
