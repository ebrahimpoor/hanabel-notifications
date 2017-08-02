import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Notification } from '../interfaces/notification.type';
import { Options } from '../interfaces/options.type';
import { HanaNotificationsService } from '../services/hana-notifications.service';

@Component({
    selector: 'hana-notifications',
    templateUrl: 'hana-notifications.component.html',
    styleUrls: ['./hana-notifications.component.scss']
})
export class HanaNotificationsComponent implements OnInit {

    @Input() set options(opt: Options) {
        this.attachChanges(opt);
    }
    public notifications: Notification[] = [];
    private listener: Subscription;

    // Sent values
    public timeOut = 0;
    public maxLength = 0;
    public clickToClose = true;
    public showProgressBar = true;
    public pauseOnHover = true;
    public theClass = '';
    public rtl = false;
    public animate: 'fromRight' | 'fromLeft' | 'rotate' | 'scale' = 'fromRight';

    constructor(private hanaNotificationsService: HanaNotificationsService) {}

    ngOnInit(): void {
        // Listen for changes in the service
        this.listener = this.hanaNotificationsService.getChangeEmitter()
            .subscribe(item => {
                console.log('item ==>>', item);
                switch (item.command) {
                    case 'cleanAll':
                        this.notifications = [];
                        break;
                        
                    case 'clean':
                        this.cleanSingle(item.id!);
                        break;

                    case 'set':
                        if (item.add) 
                            this.add(item.notification!);
                        else
                            this.defaultBehavior(item);
                        break;

                    default:
                        this.defaultBehavior(item);
                        break;
                }
            });
    }


    add(item) {
        console.log('ADDDDD', item);
        this.notifications.push(item);
    }

    // Default behavior on event
    defaultBehavior(value: any): void {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        // this.onDestroy.emit(this.buildEmit(value.notification, false));
    }

    cleanSingle(id: string): void {
        let indexOfDelete = 0;
        let doDelete = false;

        this.notifications.forEach((notification, idx) => {
            if (notification.id === id) {
                indexOfDelete = idx;
                doDelete = true;
            }
        });

        if (doDelete) {
            this.notifications.splice(indexOfDelete, 1);
        }
    }


    // Attach all the changes received in the options object
    attachChanges(options: any): void {
        Object.keys(options).forEach(a => {
            if (this.hasOwnProperty(a)) {
                (<any>this)[a] = options[a];
            } else if (a === 'icons') {
                this.hanaNotificationsService.icons = options[a];
            }
        });
    }

}
