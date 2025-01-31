import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { JobListing } from "src/recruiter/Entities/joblistings.entity";
import { Recruiter } from "src/recruiter/Entities/recruiter.entity";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email:string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    date_of_birth: Date;

    @Column()
    phoneNumber: string;

    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;

    @Column({default: false})
    verified: boolean;


    @ManyToMany(() => JobListing)
    @JoinTable()
    jobApplications: JobListing[];

    //these will be the paths in the s3 storage
    @Column({ nullable: true})
    cv: string;

    @Column({ nullable: true})
    photo: string;

    @ManyToMany(() => Recruiter)
    @JoinTable()
    recruiters: Recruiter[]

    


}