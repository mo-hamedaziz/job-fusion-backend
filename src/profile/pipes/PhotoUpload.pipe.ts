import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";



@Injectable()
export class PhotoValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        if (!value.originalname.endsWith("jpeg") && !value.originalname.endsWith("png") ){
            throw new BadRequestException('Only Jpeg and PNG are allowed ')

        }

        if (value.size >=1000000) {
            //1 Mega
            throw new BadRequestException('file too big onyl allow files smaller than 1 Megabyte')
        }
        return value
    }
}