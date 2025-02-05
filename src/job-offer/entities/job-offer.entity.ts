import { JobApplication } from 'src/job-application/entities/job-application.entity';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('job_offers')
export class JobOffer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column('text')
  description: string;

  @Column()
  employmentType:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Internship'
    | 'Temporary';

  @Column('simple-array')
  requirements: string[];

  @Column('simple-array', { nullable: true })
  benefits?: string[];

  @Column()
  experienceLevel: 'Entry' | 'Mid' | 'Senior';

  @Column({ nullable: true })
  educationLevel?: string;

  @Column({ type: 'timestamp', nullable: true })
  applicationDeadline?: Date;

  @Column({ nullable: true })
  remoteOption?: boolean;

  @Column({ nullable: true })
  industry?: string;

  @Column('simple-array', { nullable: true })
  responsibilities?: string[];

  @Column('simple-array', { nullable: true })
  keywords?: string[];

  @Column({ nullable: true })
  contactEmail?: string;

  @Column({ nullable: true })
  applicationUrl?: string;

  @Column({ nullable: true })
  companyLogoUrl?: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.jobOffers)
  recruiter: Recruiter;

  @OneToMany(
    () => JobApplication,
    (jobApplication) => jobApplication.jobOffer,
    { nullable: false, onDelete: 'CASCADE' },
  )
  jobApplications: JobApplication[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
