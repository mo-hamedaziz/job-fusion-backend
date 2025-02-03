import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  HttpStatus,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from './guards/AuthenticatedResponse';
import { AuthCookieGuard } from './guards/user.guard';

function generateRandomNumberString(length) {
  let result = 0;
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 100); // Generates a random number between 0 and 9
  }
  return result;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async login(@Body() SignUpDto: SignUpDto) {
    //Add an email to confirm registration
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      dateOfBirth,
      Recruiter,
      phoneNumber,
      gender,
    } = SignUpDto;
    const salt = await bcrypt.genSalt();
    const password_crypted = await bcrypt.hash(password, salt);
    let user;
    if (Recruiter == false) {
      user = await this.authService.add_user(
        firstName,
        lastName,
        username,
        email,
        password_crypted,
        dateOfBirth,
        phoneNumber,
        gender,
      );
    } else {
      user = await this.authService.add_recruiter(
        firstName,
        lastName,
        username,
        email,
        password_crypted,
        dateOfBirth,
        phoneNumber,
        gender,
      );
    }

    const code = generateRandomNumberString(6);
    this.authService.send_email(code, user);
    return code;
  }

  @Post('sign')
  async signin(@Body() SignInDto: SignInDto, @Res() res: Response) {
    const user = await this.authService.find_user(
      SignInDto.email,
      SignInDto.password,
    );
    if (user) {
      if (!user.verified) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Unverified User',
        });
      } else {
        const payload = {
          userid: user.id,
          recruiter: false,
        };
        const token = this.authService.generateToken(payload);
        console.log(token);
        res.cookie('token', token, {
          maxAge: 1000 * 60 * 30,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });

        return res.status(HttpStatus.OK).json({ message: 'login succesfull' });
      }
    }
    const recruiter = await this.authService.find_recruiter(
      SignInDto.email,
      SignInDto.password,
    );
    console.log(recruiter);
    if (!recruiter) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Auhtentifcation failed',
      });
    }
    if (!recruiter.verified) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Auhtentifcation failed',
      });
    } else {
      const payload = {
        userid: recruiter.id,
        recruiter: true,
      };
      const token = this.authService.generateToken(payload);

      res.cookie('token', token, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return res.status(HttpStatus.OK).json({ message: 'login succesfull' });
    }
  }

  @Post('verify/:code')
  async verify(
    @Param('code') code: number,
    @Body() SignInDto: SignInDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.find_user(
      SignInDto.email,
      SignInDto.password,
    );
    console.log(user);
    if (user) {
      if (user.verified) {
        return res.status(HttpStatus.ACCEPTED).json({
          message: 'User Verified1',
        });
      }

      if (await this.authService.verify_user(code, user)) {
        this.authService.update_verified_status(user);
        return res.status(HttpStatus.ACCEPTED).json({
          message: 'User Verified',
        });
      }
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'User Unverified',
      });
    } else {
      const recruiter = await this.authService.find_recruiter(
        SignInDto.email,
        SignInDto.password,
      );
      if (recruiter.verified) {
        return res.status(HttpStatus.ACCEPTED).json({
          message: 'User verified',
        });
      }
      if (await this.authService.verify_user(code, recruiter)) {
        this.authService.update_verified_status(recruiter);
        return res.status(HttpStatus.ACCEPTED).json({
          message: 'User verified',
        });
      }
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'User Unverified',
      });
    }
  }

  @UseGuards(AuthCookieGuard)
  @Get('is_authenticated')
  isAutehnticated(@Req() req: AuthenticatedRequest) {
    if (req.user) {
      return req.user;
    }
  }
}
