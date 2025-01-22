import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recruiter } from "./recruiter.entity";



@Entity('JobListing')
export class JobListing {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @ManyToOne(() => Recruiter, (recruiter) =>recruiter.jobOffers)
    postedBy: Recruiter;

}