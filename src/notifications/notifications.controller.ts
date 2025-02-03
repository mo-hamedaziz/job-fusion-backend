import { Controller, Req, Sse } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/guards/AuthenticatedResponse';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) {}



    @Sse('notifications')
    SubscribeApplicationsStatus(@Req()req: AuthenticatedRequest) {

        return new Observable((subscriber) => {
            this.notificationsService.subscribe(req.user.userid).subscribe((message) => {
                subscriber.next({data : message})
            })
        })

    }
}
