import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  @Get('me')
  getUserId(@Req() request: Request): { userId: string; isRecruiter: boolean } {
    try {
      const token = request.cookies?.token;
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const secretKey = process.env.SECRET_JWT;
      if (!secretKey) {
        throw new Error('SECRET_JWT is not defined in environment variables');
      }

      const { userid, recruiter = false } = jwt.verify(token, secretKey) as {
        userid: string;
        recruiter?: boolean;
      };

      return { userId: userid, isRecruiter: recruiter };
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
