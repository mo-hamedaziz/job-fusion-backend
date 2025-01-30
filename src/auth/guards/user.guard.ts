import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookie['token']
        if (!token) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        try {
            const payload = this.jwtService.verify(token, {secret: process.env.SECRET_JWT})
            request['user'] = payload;
            return true;
        } catch(error) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        //Do some logic to check if the token is good


    }
    
}