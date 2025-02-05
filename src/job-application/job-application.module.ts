import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-application.entity';
import { User } from 'src/user/Entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, User])],

  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
