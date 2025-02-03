import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobApplication } from 'src/job-application/entities/job-application.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' , nullable: true})
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
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
  country?: string;

  @Column({ type: 'varchar', nullable: true })
  region?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  summary?: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: ['Male', 'Female'], nullable: true })
  gender?: 'Male' | 'Female';

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  cv?: string;

  @Column({ type: 'varchar', nullable: true })
  photo?: string;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.user)
  jobApplications: JobApplication[];

  @Column('simple-array', { nullable: true })
  languages?: string[];

  @Column('simple-array', { nullable: true })
  studies?: string[];

  @Column('simple-array', { nullable: true })
  work_experiences?: string[];
}
