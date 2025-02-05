import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { AuthenticatedRequest } from 'src/auth/guards/AuthenticatedResponse';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() createJobApplicationDto: CreateJobApplicationDto, @Res() res: Response) {
    const userId = req.user.userid; 
    console.log(userId)
    return this.jobApplicationService.create( createJobApplicationDto ,userId )
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
}
