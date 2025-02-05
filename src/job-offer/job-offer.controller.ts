import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { JobOffer } from './entities/job-offer.entity';
import { AuthenticatedRequest } from 'src/auth/guards/AuthenticatedResponse';
import { JobApplication } from 'src/job-application/entities/job-application.entity';
import { AuthCookieGuard } from 'src/auth/guards/user.guard';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Post()
  async create(
    @Body() createJobOfferDto: CreateJobOfferDto,
  ): Promise<JobOffer> {
    return this.jobOfferService.create(createJobOfferDto);
  }

  @UseGuards(AuthCookieGuard)
  @Get()
  async findAll(): Promise<JobOffer[]> {
    return this.jobOfferService.findAll();
  }

  @UseGuards(AuthCookieGuard)
  @Get('recruiter')
  async findByRecruiter(@Req() req:AuthenticatedRequest): Promise<JobOffer[]> {
    const userId= req.user.userid;
    if (userId) {
      return this.jobOfferService.findByRecruiter(userId);
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
