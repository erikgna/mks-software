import { IsNotEmpty } from 'class-validator';

export class CreateActorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  gender: string;
}
