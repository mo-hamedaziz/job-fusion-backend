import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { Recruiter } from './recruiter/Entities/recruiter.entity';
import { JobListing } from './recruiter/Entities/joblistings.entity';
import { User } from './user/Entities/User.entity';
require('dotenv').config()

console.log(process.env.DATABASE_HOST)
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'aaa',
      database: 'db_project',
      synchronize: true,
      entities: [Recruiter,JobListing,User],
      autoLoadEntities: true,

    }),
    UserModule,
    RecruiterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
