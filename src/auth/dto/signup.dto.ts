import { IsEmail, IsString } from 'class-validator';

export class SingupDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
}
