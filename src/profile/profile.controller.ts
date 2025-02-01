import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoValidationPipe } from './pipes/PhotoUpload.pipe';
import { v4 as uuidv4 } from 'uuid';
import { ProfileService } from './profile.service';
import { AuthCookieGuard } from 'src/auth/guards/user.guard';
import { AuthenticatedRequest } from 'src/auth/guards/AuthenticatedResponse';
import {Response} from 'express'
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { CvValidatorPipe } from './pipes/CvUpload.pipe';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';
import { User } from 'src/user/Entities/User.entity';


@UseGuards(AuthCookieGuard)
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService : ProfileService) {}

    @Post('upload_photo')
    @UseInterceptors(FileInterceptor('file'))
    async UploadPhoto(@UploadedFile(new PhotoValidationPipe()) file: Express.Multer.File, @Req()req : AuthenticatedRequest,  @Res() res:Response) {
        const file_id: string= uuidv4();
        const key:string = await this.profileService.UploadTos3(file_id,file);
        console.log(req.user)
        await this.profileService.UpdatePhoto_db(req.user.userid,key,req.user.recruiter);
        return res.status(HttpStatus.CREATED).json({message:'Photo Uploaded succefully'})

    }

    @Post('cv_upload')
    @UseInterceptors(FileInterceptor('file'))
    async UploadCV(@UploadedFile(new CvValidatorPipe()) file:Express.Multer.File, @Req()req : AuthenticatedRequest,  @Res() res:Response) {
        const file_id: string= uuidv4();
        const key:string = await this.profileService.UploadTos3(file_id,file);
        await this.profileService.UpdateCV_db(req.user.userid,key);  
        return res.status(HttpStatus.CREATED).json({message:'Cv Uploaded succefully'})

    }

        @Get('photo')
        async get_photo(@Req() req: AuthenticatedRequest, @Res({passthrough: true}) res: Response){
            console.log('hola')
            try {
            // Get the path of the file
            const key:string = await this.profileService.Get_photo_key(req.user.userid,req.user.recruiter);
            if (key) {
            const {stream,contentType} =await this.profileService.Get_artifact_s3(key);
            res.setHeader('Content-Type', contentType);
            return stream;
            }

            return res.status(HttpStatus.NOT_FOUND).json({message: 'Photo not found'})
        } catch(error) {
            console.error();
            return res.status(500).json({message: 'Error Downloading File'})
    }
}
    @Get('cv')
    async get_cv(@Req() req: AuthenticatedRequest, @Res({passthrough: true}) res: Response){
        try {
        // Get the path of the file
        const key:string = await this.profileService.Get_cv_key(req.user.userid);
        console.log(key)
        if (key) {
        const {stream,contentType} =await this.profileService.Get_artifact_s3(key);
        res.setHeader('Content-Type', contentType);
        return stream;
        }

        return res.status(HttpStatus.NOT_FOUND).json({message: 'Photo not found'})
    } catch(error) {
        console.error();
        return res.status(500).json({message: 'Error Downloading File'})
    }
    }

    @Patch('update')
    async updateProfile(@Req() req: AuthenticatedRequest, @Body()updateUserDto:UpdateUserDto, @Res() res: Response) {
        console.log(updateUserDto)
        const user: User =await this.profileService.Update_profile(req.user.userid,updateUserDto);
        if (user) {
            return res.status(HttpStatus.OK).json({message: 'Updated user'})
        }
        return res.status(500).json({message: 'Error Updtng user'})
    }

    @Delete('remove_language/:lang')
    async delete(@Param('lang') language: string, @Req() req: AuthenticatedRequest, @Res() res: Response){
        const langs: string[] = await this.profileService.remove_lang(req.user.userid,language);
        return res.status(200).json({ message: 'Language removed successfully', languages: langs });

    }

    @Get('user_data')
    async getuser(@Req() req: AuthenticatedRequest,@Res() res: Response) {
        return await this.profileService.get_user(req.user.userid);
    }




}