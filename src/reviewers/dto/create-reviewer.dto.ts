import { IsNotEmpty } from 'class-validator';

export class CreateReviewerDto {
  @IsNotEmpty()
  name: string;
}
