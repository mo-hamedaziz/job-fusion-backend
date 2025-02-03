import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { User } from 'src/user/Entities/User.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Verification } from './Entities/verification_coes.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwtpayload.interface';
import * as jwt from 'jsonwebtoken';
import { IsInstance } from 'class-validator';

@Injectable()
export class AuthService {
  private transporter: any;
  private readonly jwtSecret = process.env.SECRET_JWT;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
    @InjectRepository(Recruiter)
    private recruiterRepository: Repository<Recruiter>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: '8fb5d5a2213504',
        pass: 'afe7bfc37379d8',
      },
    });
  }

  //const {username, email, password, dateOfBirth, Recruiter, phoneNumber} = SignUpDto

  async add_user(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    dateOfBirth: string,
    phoneNumber: string,
    gender: 'Male' | 'Female',
  ): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.password = password;
    user.dateOfBirth = new Date(dateOfBirth);
    user.phoneNumber = phoneNumber;
    user.gender = gender;
    await this.userRepository.save(user);
    console.log(user);
    return user;
  }

  async add_recruiter(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    dateOfBirth: string,
    phoneNumber: string,
    gender: 'Male' | 'Female',
  ): Promise<Recruiter> {
    const recruiter = new Recruiter();
    recruiter.firstName = firstName;
    recruiter.lastName = lastName;
    recruiter.username = username;
    recruiter.email = email;
    recruiter.password = password;
    recruiter.dateOfBirth = new Date(dateOfBirth);
    recruiter.phoneNumber = phoneNumber;
    recruiter.gender = gender;
    console.log(recruiter);
    await this.recruiterRepository.save(recruiter);
    return recruiter;
  }

  async send_email(code: number, user: User | Recruiter): Promise<void> {
    const element = new Verification();
    element.code = code;
    element.userId = user.id;
    this.verificationRepository.save(element);

    const info = await this.transporter.sendMail({
      from: '"Mailer" <youssef.rouissi@insat.ucar.tn>',
      to: user.email,
      subject: 'Verification code',
      text: `Your verifcation code is ${code}`,
    });
  }

  async find_user(email: string, password: string): Promise<User | void> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return;
    }
    return user;
  }

  async verify_user(code: number, user: User | Recruiter): Promise<Boolean> {
    const verified_code = await this.verificationRepository.findOne({
      where: { userId: user.id },
    });
    console.log(verified_code);
    console.log(code);
    return verified_code.code == code;
  }

  async update_verified_status(user: User | Recruiter): Promise<void> {
    user.verified = true;
    if (user instanceof User) {
      await this.userRepository.save(user);
    } else {
      await this.recruiterRepository.save(user);
    }
  }

  async_find_user_id(id: string): Promise<User | null> {
    const user = this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async_find_recruiter_id(id: string): Promise<Recruiter | null> {
    const user = this.recruiterRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  generateToken(payload: JwtPayload): string {
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '2h',
    });
    return token;
  }

  async find_recruiter(
    email: string,
    password: string,
  ): Promise<Recruiter | null> {
    const recruiter: Recruiter = await this.recruiterRepository.findOne({
      where: {
        email: email,
      },
    });
    const match = await bcrypt.compare(password, recruiter.password);
    if (!match) {
      return;
    }
    return recruiter;
  }
}
