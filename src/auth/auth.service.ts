import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { User } from 'src/user/Entities/User.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Verification } from './Entities/verification_coes.entity';

@Injectable()
export class AuthService {
    private transporter: any;
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Verification) private verificationRepository: Repository<Verification>,
        ) {
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: "8fb5d5a2213504",
                pass: "afe7bfc37379d8",
            },

        })
    }
    

    //const {username, email, password, date_of_birth, Recruiter, PhoneNumber} = SignUpdto

    async add_user(username:string, email:string, password:string, date_of_birth:string,PhoneNumber:number): Promise<User> {

        const user = new User()
        user.username = username;
        user.email = email;
        user.password = password;
        user.date_of_birth =new Date(date_of_birth);
        user.phoneNumber =  PhoneNumber;
        await this.userRepository.save(user);
        return user

    }

    async add_recruiter(username:string, email:string, password:string, date_of_birth:string,PhoneNumber:number): Promise<Recruiter> {

        const recruiter = new Recruiter()
        recruiter.username = username;
        recruiter.email = email;
        recruiter.password = password;
        recruiter.date_of_birth =new Date(date_of_birth);
        recruiter.phoneNumber =  PhoneNumber;
        await this.userRepository.save(recruiter);
        return recruiter

    }

    

    async send_email(code: number,user:User): Promise<void> {

        const element = new Verification()
        element.code = code;
        element.user = user;
        element.userId = user.id;
        this.verificationRepository.save(element)
        console.log(user.email)

        const info = await this.transporter.sendMail({
            from: '"Mailer" <youssef.rouissi@insat.ucar.tn>',
            to: user.email,
            subject: "Verification code",
            text: `Your verifcation code is ${code}`,
   
        });


    }


}
