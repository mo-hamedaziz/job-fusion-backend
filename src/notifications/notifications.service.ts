import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationsService {

    private notifications = new Map<string, Subject<string>>();

    subscribe(userId: string) {

        if (!this.notifications.has(userId)) {
            this.notifications.set(userId, new Subject<string>());
        }
        return this.notifications.get(userId).asObservable();
    }

    notify(userId: string, message: string) {
        if (this.notifications.has(userId)) {
            this.notifications.get(userId).next(message)
        }
    }


}
