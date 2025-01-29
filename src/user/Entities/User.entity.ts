import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { JobListing } from "src/recruiter/Entities/joblistings.entity";
import { Recruiter } from "src/recruiter/Entities/recruiter.entity";
import { Baseuser } from "src/auth/Entities/abstract_user";

@Entity('User')
export class User extends Baseuser {

  


    @ManyToMany(() => JobListing)
    @JoinTable()
    jobApplications: JobListing[];

    //these will be the paths in the s3 storage
    @Column({ nullable: true})
    cv: string;

    @ManyToMany(() => Recruiter)
    @JoinTable()
    recruiters: Recruiter[]

    


}