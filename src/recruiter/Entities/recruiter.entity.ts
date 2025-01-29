import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany} from "typeorm";
import { Gender } from "src/user/Entities/gender.enum";
import { JobListing } from "./joblistings.entity";
import { Baseuser } from "src/auth/Entities/abstract_user";

@Entity('Recruiter')
export class Recruiter extends Baseuser {

        @OneToMany(() => JobListing, (JobListing) => JobListing.postedBy, {
            onDelete: 'CASCADE',
        })
        jobOffers: JobListing[];

}