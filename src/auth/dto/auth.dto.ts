import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  gender?: 'Male' | 'Female';

  @IsBoolean()
  isRecruiter: boolean;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
