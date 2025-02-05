import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsDate,
} from 'class-validator';

export class CreateRecruiterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @IsEnum(['Male', 'Female'])
  gender?: 'Male' | 'Female';

  @IsOptional()
  @IsString()
  photo?: string;
}
