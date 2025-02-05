import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { JobOffer } from './entities/job-offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from 'src/job-application/entities/job-application.entity';
import { User } from 'src/user/Entities/User.entity';

@Injectable()
export class JobOfferService {
  private readonly logger = new Logger(JobOfferService.name);

  constructor(
    @InjectRepository(JobOffer)
    private readonly jobOfferRepository: Repository<JobOffer>,

    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,

    @InjectRepository(JobApplication)
    private readonly jobapplicationsRepository: Repository<JobApplication>,
  ) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    try {
      const recruiter = await this.recruiterRepository.findOne({
        where: { id: createJobOfferDto.recruiterId },
      });

      if (!recruiter) {
        throw new NotFoundException('Recruiter not found');
      }

      const jobOffer = this.jobOfferRepository.create({
        ...createJobOfferDto,
        recruiter
      });

      await this.jobOfferRepository.save(jobOffer);
      console.log("wsilt lina")
      return ;
    } catch (error) {
      this.logger.error('Error creating job offer', error.stack);
      throw new BadRequestException('Error creating job offer');
    }
  }

  async findAll(): Promise<JobOffer[]> {
    try {
      return await this.jobOfferRepository.find({ relations: ['recruiter'] });
    } catch (error) {
      this.logger.error('Error retrieving job offers', error.stack);
      throw new BadRequestException('Error retrieving job offers');
    }
  }

  async findByRecruiter(recruiterId: string): Promise<JobOffer[]> {
    try {
      const recruiter = await this.recruiterRepository.findOne({
        where: { id: recruiterId },
      });

      if (!recruiter) {
        throw new NotFoundException(
          `Recruiter with ID ${recruiterId} not found`,
        );
      }

      return this.jobOfferRepository.find({
        where: { recruiter: { id: recruiterId } },
        relations: ['recruiter'],
      });
    } catch (error) {
      this.logger.error(
        'Error retrieving job offers by recruiter',
        error.stack,
      );
      throw new BadRequestException('Error retrieving job offers by recruiter');
    }
  }

  async findOne(id: string): Promise<JobOffer> {
    try {
      const jobOffer = await this.jobOfferRepository.findOne({
        where: { id },
        relations: ['recruiter'],
      });

      if (!jobOffer) {
        throw new NotFoundException(`JobOffer with ID ${id} not found`);
      }

      return jobOffer;
    } catch (error) {
      this.logger.error('Error retrieving job offer', error.stack);
      throw new BadRequestException('Error retrieving job offer');
    }
  }

  async update(
    id: string,
    updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<JobOffer> {
    try {
      const jobOffer = await this.jobOfferRepository.preload({
        id,
        ...updateJobOfferDto,
      });

      if (!jobOffer) {
        throw new NotFoundException(`JobOffer with ID ${id} not found`);
      }

      return this.jobOfferRepository.save(jobOffer);
    } catch (error) {
      this.logger.error('Error updating job offer', error.stack);
      throw new BadRequestException('Error updating job offer');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const jobOffer = await this.findOne(id);
      await this.jobOfferRepository.remove(jobOffer);
    } catch (error) {
      this.logger.error('Error deleting job offer', error.stack);
      throw new BadRequestException('Error deleting job offer');
    }
  }

  async toggleActive(id: string): Promise<JobOffer> {
    try {
      const jobOffer = await this.jobOfferRepository.findOne({
        where: { id },
      });

      if (!jobOffer) {
        throw new NotFoundException(`Job offer with ID ${id} not found`);
      }

      jobOffer.active = !jobOffer.active;

      return await this.jobOfferRepository.save(jobOffer);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to toggle active status for job offer with ID ${id}: ${error.message}`,
      );
    }
  }



  }
