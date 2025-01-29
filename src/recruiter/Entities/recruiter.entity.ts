import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany} from "typeorm";
import { Gender } from "src/user/Entities/gender.enum";
import { JobListing } from "./joblistings.entity";

@Entity('Recruiter')
export class Recruiter {
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
        phoneNumber: number;
    
        @Column({
            type: "enum",
            enum: Gender,
        })
        gender: Gender;

        @Column({nullable: true })
        photo: string;

        @OneToMany(() => JobListing, (JobListing) => JobListing.postedBy, {
            onDelete: 'CASCADE',
        })
        jobOffers: JobListing[];

}