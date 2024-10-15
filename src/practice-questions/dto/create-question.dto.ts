import { IsString, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsString()
  topic: string;

  @IsString()
  category: string;
}
