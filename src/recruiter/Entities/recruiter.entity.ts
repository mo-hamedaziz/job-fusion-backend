import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gender } from 'src/user/Entities/gender.enum';
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
  phoneNumber: number;

  @Column({ default: false })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => JobOffer, (jobOffer) => jobOffer.recruiter)
  jobOffers: JobOffer[];
}
