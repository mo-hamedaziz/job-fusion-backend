import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/Entities/User.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Verification } from './Entities/verification_coes.entity';
import { UserModule } from 'src/user/user.module';
import { JWtStrategy } from './jwtstrategy';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: "secret", //process.env.SECRET_JWT,
    //   signOptions: {
    //     expiresIn: '2 days',
    //   },
    // }),
    JwtModule,
    TypeOrmModule.forFeature([Verification, User, Recruiter]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWtStrategy],
  exports: [AuthService, JWtStrategy, JwtModule],
})
export class AuthModule {}
