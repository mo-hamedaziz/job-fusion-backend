import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { JobOffer } from './entities/job-offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobOfferService {
  constructor(
    @InjectRepository(JobOffer)
    private readonly jobOfferRepository: Repository<JobOffer>,

    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,
  ) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    const recruiter = await this.recruiterRepository.findOne({
      where: { id: createJobOfferDto.recruiterId },
    });

    if (!recruiter) {
      throw new NotFoundException('Recruiter not found');
    }

    const jobOffer = this.jobOfferRepository.create({
      ...createJobOfferDto,
      recruiter,
    });
    return this.jobOfferRepository.save(jobOffer);
  }

  async findAll(): Promise<JobOffer[]> {
    return this.jobOfferRepository.find({ relations: ['recruiter'] });
  }

  async findByRecruiter(recruiterId: string): Promise<JobOffer[]> {
    const recruiter = await this.recruiterRepository.findOne({
      where: { id: recruiterId },
    });

    if (!recruiter) {
      throw new NotFoundException(`Recruiter with ID ${recruiterId} not found`);
    }

    return this.jobOfferRepository.find({
      where: { recruiter: { id: recruiterId } },
      relations: ['recruiter'],
    });
  }

  async findOne(id: string): Promise<JobOffer> {
    const jobOffer = await this.jobOfferRepository.findOne({
      where: { id },
      relations: ['recruiter'],
    });

    if (!jobOffer) {
      throw new NotFoundException(`JobOffer with ID ${id} not found`);
    }

    return jobOffer;
  }

  async update(
    id: string,
    updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<JobOffer> {
    const jobOffer = await this.jobOfferRepository.preload({
      id,
      ...updateJobOfferDto,
    });

    if (!jobOffer) {
      throw new NotFoundException(`JobOffer with ID ${id} not found`);
    }

    return this.jobOfferRepository.save(jobOffer);
  }

  async remove(id: string): Promise<void> {
    const jobOffer = await this.findOne(id);
    await this.jobOfferRepository.remove(jobOffer);
  }
}
