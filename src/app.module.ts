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

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [Recruiter, User, JobOffer],
      autoLoadEntities: true,
    }),
    UserModule,
    RecruiterModule,
    JobOfferModule,
    JobApplicationModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
