import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobOffer } from 'src/job-offer/entities/job-offer.entity';

@Entity('Recruiter')
export class Recruiter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  date_of_birth: Date;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  gender: 'Male' | 'Female';

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => JobOffer, (jobOffer) => jobOffer.recruiter)
  jobOffers: JobOffer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
