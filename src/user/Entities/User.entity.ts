import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobApplication } from 'src/job-application/entities/job-application.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  gender: 'Male' | 'Female';

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  cv: string;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.user)
  jobApplications: JobApplication[];
}
