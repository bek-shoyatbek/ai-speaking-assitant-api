import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePracticeSessionDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  topicId: string;
}
