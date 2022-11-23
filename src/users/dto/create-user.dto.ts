import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MessagesHelper } from '../../helpers/messages.helper';
import { RegExHelper } from '../../helpers/regex.helpler';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(3, 30)
  @IsNotEmpty()
  @ApiProperty({ minLength: 3, maxLength: 30 })
  firstName: string;

  @Length(3, 40)
  @IsNotEmpty()
  @ApiProperty({ minLength: 3, maxLength: 40 })
  lastName: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  @ApiProperty()
  password: string;
}
