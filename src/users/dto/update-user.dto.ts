import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(3, 30)
  @IsNotEmpty()
  @ApiProperty({ minLength: 3, maxLength: 30 })
  firstName: string;

  @Length(3, 40)
  @IsNotEmpty()
  @ApiProperty({ minLength: 3, maxLength: 40 })
  lastName: string;
}
