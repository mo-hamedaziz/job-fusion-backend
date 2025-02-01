import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class CvValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
         if (!value.originalname.endsWith("pdf")){
                    throw new BadRequestException('Only Jpeg and PNG are allowed ')
                }
        
                if (value.size >=2000000) {
                    //2 Mega
                    throw new BadRequestException('file too big onyl allow files smaller than 1 Megabyte')
                }
                return value
    }
}