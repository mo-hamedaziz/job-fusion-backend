import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobOffer } from 'src/job-offer/entities/job-offer.entity';

// export enum Gender {
//   Male = 'Male',
//   Female = 'Female',
// }

@Entity('Recruiter')
export class Recruiter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber?: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'enum', enum: ['Male', 'Female'], nullable: true })
  gender?: 'Male' | 'Female';

  @Column({ type: 'varchar', nullable: true })
  photo?: string;

  @OneToMany(() => JobOffer, (jobOffer) => jobOffer.recruiter)
  jobOffers: JobOffer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
