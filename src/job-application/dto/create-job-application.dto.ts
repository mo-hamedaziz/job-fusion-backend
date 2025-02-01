import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationDto {
  @IsUUID()
  @IsNotEmpty()
  jobOfferId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  cvPath?: string; 

  @IsOptional()
  @IsString()
  coverLetterUrl?: string; 

  @IsOptional()
  @IsString()
  motivationParagraph?: string;

  @IsOptional()
  @IsString()
  additionalComment?: string;
}
