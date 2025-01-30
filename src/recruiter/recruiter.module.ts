import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './Entities/recruiter.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recruiter])],
})
export class RecruiterModule {}
