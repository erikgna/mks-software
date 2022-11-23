import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateActorDto {
  @Length(3, 30)
  @IsNotEmpty()
  @ApiProperty({ minLength: 3, maxLength: 30 })
  firstName: string;

  @Length(3, 40)
  @IsNotEmpty()
  @ApiProperty({ minLength: 3, maxLength: 40 })
  lastName: string;

  @Length(1, 1)
  @IsNotEmpty()
  @ApiProperty({ maxLength: 1 })
  gender: string;
}
