import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/Entities/User.entity';
import { RecruiterModule } from 'src/recruiter/recruiter.module';
import { UserModule } from 'src/user/user.module';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { RecruiterService } from 'src/recruiter/recruiter.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService,RecruiterService,UserService],
  imports:[AuthModule,MulterModule.register({
    limits:{fieldNameSize:70}
     }),
          TypeOrmModule.forFeature([User,Recruiter]),
          RecruiterModule,
          UserModule
    ],
})
export class ProfileModule {}
