import { Controller, Post, Body } from '@nestjs/common';
import { SignUpdto } from './dto/auth.dto';
import * as bcrypt from "bcrypt"
import { AuthService } from './auth.service';
import { User } from 'src/user/Entities/User.entity';




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
}
