import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from 'src/recruiter/dto/create-recruiter.dto';
import { Recruiter } from './Entities/recruiter.entity';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  async create(
    @Body() createRecruiterDto: CreateRecruiterDto,
  ): Promise<Recruiter> {
    return await this.recruiterService.create(createRecruiterDto);
  }

  @Get()
  async findAll(): Promise<Recruiter[]> {
    return await this.recruiterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recruiter> {
    return await this.recruiterService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecruiterDto: UpdateRecruiterDto,
  ): Promise<Recruiter> {
    return await this.recruiterService.update(id, updateRecruiterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.recruiterService.remove(id);
  }
}
