import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateMovieDto {
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
  releaseDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  releaseCountry: string;

  @IsNotEmpty()
  @ApiProperty({ description: "Lista com ID's dos diretores" })
  directorsID: string[];

  @IsNotEmpty()
  @ApiProperty({
    description: "Lista com objeto de ID's e papéis da cada ator.",
  })
  castsID: {
    role: string;
    actorID: string;
  }[];

  @IsNotEmpty()
  @ApiProperty({ description: "Lista com ID's dos genêros" })
  genresID: string[];
}
