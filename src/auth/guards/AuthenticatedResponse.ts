import { Request } from 'express';
import { Recruiter } from "src/recruiter/Entities/recruiter.entity";
import { User } from "src/user/Entities/User.entity";
import { JwtPayload } from '../dto/jwtpayload.interface';


export class AuthenticatedRequest extends Request {
    user?: JwtPayload;

}