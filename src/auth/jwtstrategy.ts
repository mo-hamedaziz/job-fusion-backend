import {PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-local';
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./dto/jwtpayload.interface";

let HttponlyCookieExtractor = (req: Request): string | null => {
    let token:string | null =null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token
}


@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: HttponlyCookieExtractor,
            ignoreExpiration: true,
            secretOrKey: process.env.SECRET_JWT,
          });
    }

    async validate(payload: JwtPayload) {
        if (!payload.recruiter) {
        const user = await this.authService.async_find_user_id(payload.userid); // Fetch user by ID from DB
        console.log('HEHEHE')
        if (!user) {
          throw new Error('Unauthorized'); // Handle unauthorized case
        }
        return user;  // Ret
    }
        const recruiter = await this.authService.async_find_recruiter_id(payload.userid);
        if (!recruiter) {
            throw new Error('Unauthorized'); // Handle unauthorized case
        }
        return recruiter;  // Ret
    }

        
    


}