import { Module } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { JobOfferController } from './job-offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOffer } from './entities/job-offer.entity';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { JobApplication } from 'src/job-application/entities/job-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobOffer, Recruiter,JobApplication])],
  controllers: [JobOfferController],
  providers: [JobOfferService],
  exports: [JobOfferService],
})
export class JobOfferModule {}
