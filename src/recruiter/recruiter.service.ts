import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Recruiter } from './Entities/recruiter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecruiterDto } from 'src/recruiter/dto/create-recruiter.dto';
import { UpdateRecruiterDto } from 'src/recruiter/dto/update-recruiter.dto';

@Injectable()
export class RecruiterService {
  constructor(
    @InjectRepository(Recruiter)
    private recruiterRepository: Repository<Recruiter>,
  ) {}

  async create(createRecruiterDto: CreateRecruiterDto): Promise<Recruiter> {
    try {
      const recruiter = this.recruiterRepository.create(createRecruiterDto);
      return await this.recruiterRepository.save(recruiter);
    } catch (error) {
      console.error('Error creating recruiter:', error);
      throw new InternalServerErrorException('Failed to create recruiter');
    }
  }

  async findAll(): Promise<Recruiter[]> {
    try {
      return await this.recruiterRepository.find();
    } catch (error) {
      console.error('Error retrieving recruiters:', error);
      throw new InternalServerErrorException('Failed to retrieve recruiters');
    }
  }

  async findOne(id: string): Promise<Recruiter> {
    try {
      const recruiter = await this.recruiterRepository.findOne({
        where: { id },
      });
      if (!recruiter) {
        throw new NotFoundException(`Recruiter with ID ${id} not found`);
      }
      return recruiter;
    } catch (error) {
      console.error(`Error retrieving recruiter with ID ${id}:`, error);
      throw new InternalServerErrorException('Error retrieving recruiter');
    }
  }

  async update(
    id: string,
    updateRecruiterDto: UpdateRecruiterDto,
  ): Promise<Recruiter> {
    try {
      const recruiter = await this.findOne(id);
      if (!recruiter) {
        throw new NotFoundException(`Recruiter with ID ${id} not found`);
      }
      await this.recruiterRepository.update(id, updateRecruiterDto);
      return await this.findOne(id);
    } catch (error) {
      console.error(`Error updating recruiter with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update recruiter');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const recruiter = await this.findOne(id);
      if (!recruiter) {
        throw new NotFoundException(`Recruiter with ID ${id} not found`);
      }
      await this.recruiterRepository.delete(id);
    } catch (error) {
      console.error(`Error deleting recruiter with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete recruiter');
    }
  }
}
