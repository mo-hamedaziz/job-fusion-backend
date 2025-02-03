import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { AuthenticatedRequest } from 'src/auth/guards/AuthenticatedResponse';
import { JobApplication } from './entities/job-application.entity';
import { Response } from 'express';
import { NotificationsService } from 'src/notifications/notifications.service';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService,
              private readonly notificationService: NotificationsService,
  ) {}

  @Post()
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    return this.jobApplicationService.create(createJobApplicationDto);
  }

  @Get()
  findAll() {
    return this.jobApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobApplicationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationService.update(id, updateJobApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobApplicationService.remove(id);
  }

  @Get('jobapplicants/:job_id')
  async getAllApplicants(@Param('id') id:string, @Req()req: AuthenticatedRequest) {
      this.jobApplicationService.findApplicants(id);
    }
  
  
  @Patch(':applicationId/accept')
  async acceptApplication( @Param('applicationId') app_id:string, @Req()req: AuthenticatedRequest, @Res()res: Response) {
  
      const job_application: JobApplication = await this.jobApplicationService.findOne(app_id); 
      await this.jobApplicationService.update_status(job_application,'accepted')
      this.notificationService.notify(
        job_application.user.id,
        `Your application for ${job_application.jobOffer.title} has been accepted.`
      )

      return {message: 'Application accepted sueccfully'}
    }
  
  @Patch(':applicationId/reject')
  async rejectApplication( @Param('applicationId') app_id:string, @Req()req: AuthenticatedRequest, @Res()res: Response) {
  
      const job_application: JobApplication = await this.jobApplicationService.findOne(app_id); 
      await this.jobApplicationService.update_status(job_application,'rejected');
      this.notificationService.notify(
        job_application.user.id,
        `Your application for ${job_application.jobOffer.title} has been rejected.`
      )
      return {message: 'Application accepted sueccfully'};
  
    }





}
