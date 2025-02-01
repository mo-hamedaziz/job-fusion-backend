import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "src/user/Entities/gender.enum";
export abstract class Baseuser {
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
        
        @Column({ nullable: true})
        photo: string;
    
}