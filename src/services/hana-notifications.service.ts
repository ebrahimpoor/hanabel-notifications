import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NotificationEvent } from '../interfaces/notification-event.type';
import { Notification } from '../interfaces/notification.type';
import { Icons, defaultIcons } from '../interfaces/icons';

@Injectable()
export class HanaNotificationsService {

    private emitter: Subject<NotificationEvent> = new Subject<NotificationEvent>();
    public icons: Icons = defaultIcons;

    set(notification: Notification, to: boolean) {
        console.log('2');
        notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
        notification.click = new EventEmitter<{}>();
        this.emitter.next({command: 'set', notification: notification, add: to});
        return notification;
    };

    getChangeEmitter() {
        return this.emitter;
    }

    //// Access methods
    success(title: string, content?: string, override?: any) {
        return this.set({title: title, content: content || '', type: 'success', icon: this.icons.success, override: override}, true);
    }

    error(title: string, content?: string, override?: any) {
        return this.set({title: title, content: content || '', type: 'error', icon: this.icons.error, override: override}, true);
    }


    create(title, msg, opt) {

        console.log(title, msg, opt);

    }

}
