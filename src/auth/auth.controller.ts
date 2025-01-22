import { Controller, Post, Body } from '@nestjs/common';
import { SignUpdto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {



    @Post('signup')
    login(@Body() SignUpdto : SignUpdto) { 
        

    }
}
