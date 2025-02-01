import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobOffer } from './entities/job-offer.entity';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Post()
  async create(
    @Body() createJobOfferDto: CreateJobOfferDto,
  ): Promise<JobOffer> {
    return this.jobOfferService.create(createJobOfferDto);
  }

  @Get()
  async findByRecruiter(
    @Query('recruiterId') recruiterId?: string,
  ): Promise<JobOffer[]> {
    if (recruiterId) {
      return this.jobOfferService.findByRecruiter(recruiterId);
    }
    return this.jobOfferService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobOffer> {
    return this.jobOfferService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<JobOffer> {
    return this.jobOfferService.update(id, updateJobOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.jobOfferService.remove(id);
  }

  @Patch(':id/toggle-active-state')
  async toggleActive(@Param('id') id: string): Promise<JobOffer> {
    return this.jobOfferService.toggleActive(id);
  }
}
