import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsEnum,
  IsDateString,
  IsEmail,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateJobOfferDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'])
  employmentType:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Internship'
    | 'Temporary';

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  requirements: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @IsEnum(['Entry', 'Mid', 'Senior'])
  experienceLevel: 'Entry' | 'Mid' | 'Senior';

  @IsString()
  @IsOptional()
  educationLevel?: string;

  @IsDateString()
  @IsOptional()
  applicationDeadline?: Date;

  @IsBoolean()
  @IsOptional()
  remoteOption?: boolean;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsDateString()
  postedDate: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  responsibilities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keywords?: string[];

  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @IsUrl()
  @IsOptional()
  applicationUrl?: string;

  @IsUrl()
  @IsOptional()
  companyLogoUrl?: string;

  @IsBoolean()
  active: boolean;

  @IsUUID()
  @IsNotEmpty()
  recruiterId: string;
}
