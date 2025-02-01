import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>, 
    
  ) {}

  async create(createJobApplicationDto: CreateJobApplicationDto): Promise<JobApplication> {
    const jobApplication = this.jobApplicationRepository.create(createJobApplicationDto);
    return await this.jobApplicationRepository.save(jobApplication);
  }

  async findAll(): Promise<JobApplication[]> {
    return await this.jobApplicationRepository.find();
  }

  async findOne(id: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findOne({ where: { id } });
    if (!jobApplication) throw new NotFoundException(`Job Application #${id} not found`);
    return jobApplication;
  }

  async update(id: string, updateJobApplicationDto: UpdateJobApplicationDto): Promise<JobApplication> {
    await this.findOne(id); // Ensure it exists
    await this.jobApplicationRepository.update(id, updateJobApplicationDto);
    return this.findOne(id); // Return updated entity
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await this.jobApplicationRepository.delete(id);
  }
}
