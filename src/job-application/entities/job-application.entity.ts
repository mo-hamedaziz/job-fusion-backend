import { JobOffer } from 'src/job-offer/entities/job-offer.entity';
import { User } from 'src/user/Entities/User.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  cvPath: string;

  @Column({ nullable: true })
  coverLetterPath: string;

  @Column({ type: 'text', nullable: true })
  motivationParagraph: string;

  @Column({ type: 'text', nullable: true })
  additionalComment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.jobApplications, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => JobOffer, (jobOffer) => jobOffer.jobApplications)
  jobOffer: JobOffer;

  @Column({type: 'enum', enum: ['pending','accepted','rejected'], default: 'pending'})
  status: 'pending' | 'accepted' | 'rejected';

  


}
