import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationDto {
  @IsUUID()
  @IsNotEmpty()
  jobOfferId: string; // ID of the job offer being applied for

  @IsOptional()
  @IsString()
  cvUrl?: string; // S3 URL for CV

  @IsOptional()
  @IsString()
  coverLetterUrl?: string; // S3 URL for Cover Letter

  @IsOptional()
  @IsString()
  motivationParagraph?: string;

  @IsOptional()
  @IsString()
  additionalComment?: string;
}
