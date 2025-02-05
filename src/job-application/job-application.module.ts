import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './entities/job-application.entity';
import { User } from 'src/user/Entities/User.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AuthModule } from 'src/auth/auth.module';
import { JobOffer } from 'src/job-offer/entities/job-offer.entity';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([JobApplication,User,JobOffer]),NotificationsModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
