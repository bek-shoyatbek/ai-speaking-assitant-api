import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdatePracticeSessionDto {
  @IsString()
  @IsOptional()
  feedback?: string;

  @IsNumber()
  @IsOptional()
  score?: number;
}
