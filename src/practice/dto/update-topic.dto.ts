import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
