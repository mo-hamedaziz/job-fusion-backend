import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/Entities/User.entity';
import { Repository } from 'typeorm';
import {GetObjectAclCommand, GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import { RecruiterService } from 'src/recruiter/recruiter.service';
import { Recruiter } from 'src/recruiter/Entities/recruiter.entity';
import { UserService } from 'src/user/user.service';
import { Readable } from 'stream';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';


@Injectable()
export class ProfileService {
    private s3: S3Client;
    private readonly bucketName = process.env.BUCKETNAME

    constructor(
                private readonly recruiterService: RecruiterService,
                private readonly userService: UserService) {
        this.s3 = new S3Client({
            credentials:{
            accessKeyId:process.env.ACCES_KEY_ID,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY},
            region: process.env.AWS_REGION,
        })
    }

    async UploadTos3(id:string, file: Express.Multer.File): Promise<string> {
        const fileKey = `${id}-${file.originalname}`;
        console.log(fileKey)
        const params = {
            Bucket:this.bucketName,
            Key: fileKey,
            Body:file.buffer,
            ContentType: file.mimetype,
        }
          await this.s3.send(new PutObjectCommand(params));
          return fileKey;
    }

    async UpdatePhoto_db(id:string,photo_path:string,is_recruiter:Boolean): Promise<void>{
        if (is_recruiter) {
            const recruiter: Recruiter= await this.recruiterService.findOne(id);            
            await this.recruiterService.update(id,{photo:photo_path});
            return 
        }
        const user: User = await this.userService.findOne(id);
        await this.userService.update(id,{photo:photo_path});
        return 

    }

    async UpdateCV_db(id:string,cv_path:string): Promise<void> {
        const user: User = await this.userService.findOne(id);
        await this.userService.update(id,{cv:cv_path});
        return 

    }

    async Get_photo_key(id:string,is_recruiter:Boolean): Promise<string> {
        console.log('here')
        if (is_recruiter){

            const recuriter: Recruiter = await this.recruiterService.findOne(id);
            return recuriter.photo;
        }
        const user: User = await this.userService.findOne(id);
        return user.photo
    }

    async Get_artifact_s3(key: string): Promise<{stream: StreamableFile, contentType: string}> {
        const { Body, ContentType } = await this.s3.send(new GetObjectCommand({
            Bucket: this.bucketName,
            Key:key
        }))
        const stream = new StreamableFile(Body as Readable)
        return {stream, contentType: ContentType || 'application/octet-stream'}
    }

    async Get_cv_key(id:string): Promise<string> {
        const user: User = await this.userService.findOne(id);
        return user.cv
    }

    async Update_profile(id:string, updateUserdto:UpdateUserDto): Promise<User> {
        return await this.userService.update(id,updateUserdto);
    }

    async remove_lang(id:string,language:string) {
        const user:User = await this.userService.findOne(id);
        user.languages = user.languages.filter(lang => lang !== language);
        await this.userService.save(user);
        return user.languages
    }

    async get_user(id: string) {
        return this.userService.findOne(id);
    }


}
