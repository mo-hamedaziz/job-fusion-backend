import { Injectable } from '@nestjs/common';
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
    const recruiter = this.recruiterRepository.create(createRecruiterDto);
    return await this.recruiterRepository.save(recruiter);
  }

  async findAll(): Promise<Recruiter[]> {
    return await this.recruiterRepository.find();
  }

  async findOne(id: string): Promise<Recruiter> {
    return await this.recruiterRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateRecruiterDto: UpdateRecruiterDto,
  ): Promise<Recruiter> {
    await this.recruiterRepository.update(id, updateRecruiterDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.recruiterRepository.delete(id);
  }
}
