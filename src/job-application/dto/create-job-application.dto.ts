import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJobApplicationDto {
  /*@IsUUID()
  @IsNotEmpty()
  id: string;*/

  @IsUUID()
  @IsNotEmpty()
  jobOfferId: string;

  @IsString()
  cvPath?: string; 

  @IsString()
  coverLetterPath?: string; 

  @IsOptional()
  @IsString()
  motivationParagraph?: string;

  @IsOptional()
  @IsString()
  additionalComment?: string;
}
