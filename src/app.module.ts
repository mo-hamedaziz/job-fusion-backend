import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { Recruiter } from './recruiter/Entities/recruiter.entity';
import { User } from './user/Entities/User.entity';
import { JobOfferModule } from './job-offer/job-offer.module';
import 'dotenv/config';
import { JobOffer } from './job-offer/entities/job-offer.entity';
import { JobApplicationModule } from './job-application/job-application.module';
import { ProfileModule } from './profile/profile.module';
import { NotificationsModule } from './notifications/notifications.module';

console.log(process.env.DATABASE_HOST);
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'dev_user123',
      password: 'dev_pass123',
      database: 'jobFusionDB',
      synchronize: true,
      entities: [Recruiter, User, JobOffer],
      autoLoadEntities: true,
    }),
    UserModule,
    RecruiterModule,
    JobOfferModule,
    JobApplicationModule,
    ProfileModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
