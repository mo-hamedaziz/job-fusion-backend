import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './Entities/recruiter.entity';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Recruiter])],
    providers: [RecruiterService],
    controllers: [RecruiterController],
})
export class RecruiterModule {}
