import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';
import { User } from 'src/user/Entities/User.entity';
import { JobOffer } from 'src/job-offer/entities/job-offer.entity';


@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
    @InjectRepository(JobOffer)
    private readonly jobofferRepository: Repository<JobOffer>, 
    
  ) {}

  async create(createJobApplicationDto: CreateJobApplicationDto, iden:string): Promise<JobApplication> {

    const userr = await this.userRepository.findOne({
      where: { id: iden},
    });

    if (!userr) {
      throw new NotFoundException('user not found');
    }
    const job_offer = await this.jobofferRepository.findOne({
      where: { id: createJobApplicationDto.jobOfferId},
    })
    
    if(!job_offer){
      throw new NotFoundException('Job Offer not found');
    }

    const jobApplication = this.jobApplicationRepository.create({...createJobApplicationDto, user: userr, jobOffer: job_offer,});
    return this.jobApplicationRepository.save(jobApplication);
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
    await this.findOne(id); 
    await this.jobApplicationRepository.update(id, updateJobApplicationDto);
    return this.findOne(id); 
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); 
    await this.jobApplicationRepository.delete(id);
  }


  async findApplicants(id:string): Promise<JobApplication [] | void> {

    const jobApps: JobApplication[] = await this.jobApplicationRepository.find({
      where: {jobOffer: {id:id},
               status: 'pending', 
                },
      relations: ['user']
    })

    return jobApps
}

async update_status(job_application: JobApplication, status: "accepted" | "rejected"):Promise<void> {
  job_application.status = status;
  await this.jobApplicationRepository.save(job_application);

}

}
