import { Controller, Post, Body, UnauthorizedException, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { Signindto, SignUpdto } from './dto/auth.dto';
import * as bcrypt from "bcrypt"
import { AuthService } from './auth.service';
import { User } from 'src/user/Entities/User.entity';

import { Response } from 'express';


function generateRandomNumberString(length) {
    let result = 0;
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
    }
    return result;
  }


@Controller('auth')
export class AuthController {


    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async login(@Body() SignUpdto : SignUpdto) { 
        //Add an email to confirm registration
        const {username, email, password, date_of_birth, Recruiter, PhoneNumber} = SignUpdto
        const salt = await bcrypt.genSalt();
        const password_crypted = await bcrypt.hash(password, salt)
        let user;
        if (Recruiter == false) {
          user = await this.authService.add_user(username,email,password,date_of_birth,PhoneNumber)
        }
        else{
          user = await this.authService.add_recruiter(username,email,password,date_of_birth,PhoneNumber)
        }
        
        const code = generateRandomNumberString(6);
        this.authService.send_email(code,user);
        return code;

    }

    @Post('sign')
    async signin(@Body() signindto: Signindto, @Res() res: Response) {

        const user=  await this.authService.find_user(signindto.email, signindto.password);
      
        if (user) {
            if (!user.verified) {
                return false;
         }
            else {
                const payload = {
                 userid: user.id,
                recruiter: false,
        }
            const token = this.authService.generateToken(payload);
            //set cookies and such things
            return token
    }
    }


    const recruiter=  await this.authService.find_recruiter(signindto.email, signindto.password);
        if (!recruiter){
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Auhtentifcation failed'
            })
        }
        if (!recruiter.verified) {
            return false;
        }
        else {
        const payload = {
            userid: recruiter.id,
            recruiter: true,
        }
        const token = this.authService.generateToken(payload);
        //set cookies and such things
        return token
    }

    }

    @Get('verify/:code')
    async verify(@Param('code') code: number, email:string, password:string, @Res() res: Response){

        // Need 
        const user=  await this.authService.find_user(email, password);
        if (!user){
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Auhtentifcation failed'
            })
        }
        if (user.verified) {
            return true;
        }

        if (this.authService.verify_user(code, user))
        {
            // Update the user model

            return this.authService.update_verified_status(user);

        }
        return false;


    }
}
