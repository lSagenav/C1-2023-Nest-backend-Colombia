import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SecurityDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
