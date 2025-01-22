import {PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-local';

export class JWtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_JWT,
          });
    }

        
    


}