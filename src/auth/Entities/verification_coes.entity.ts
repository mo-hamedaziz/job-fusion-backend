import { User } from "src/user/Entities/User.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Baseuser } from "./abstract_user";

@Entity("verification")
export class Verification {
    @PrimaryColumn() // Store userId as the primary key
    userId: string;

    @Column()
    code: number;

}
