import { IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
