import { Component, OnInit, Input, NgZone } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Notification } from '../interfaces/notification.type';
import { HanaNotificationsService } from '../services/hana-notifications.service';


@Component({
    selector: 'notification-component',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationsComponent implements OnInit {


    @Input() public timeOut: number;
    @Input() public showProgressBar: boolean;
    @Input() public pauseOnHover: boolean;
    @Input() public clickToClose: boolean;
    @Input() public maxLength: number;
    @Input() public theClass: string;
    @Input() public rtl: boolean;
    @Input() public animate: string;
    @Input() public position: number;
    @Input() public item: Notification;
    
    // Progress bar variables
    public progressWidth = 0;
    public safeSvg: SafeHtml;

    private stopTime = false;
    private timer: any;
    private steps: number;
    private speed: number;
    private count = 0;
    private start: any;

    private diff: any;
    private icon: string;

    constructor(
                    private domSanitizer: DomSanitizer,
                    private hanaNotificationsService: HanaNotificationsService,
                    private zone: NgZone
                ) {
      
    }

    ngOnInit() {

        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }

        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
    }

    startTimeOut(): void {
        this.steps = this.timeOut / 10;
        this.speed = this.timeOut / this.steps;
        this.start = new Date().getTime();
        this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
    }

    // Attach all the overrides
    attachOverrides(): void {
        Object.keys(this.item.override).forEach(a => {
            if (this.hasOwnProperty(a)) {
                (<any>this)[a] = this.item.override[a];
            }
        });
    }

    private instance = () => {
        this.zone.runOutsideAngular(() => {
            this.zone.run(() => this.diff = (new Date().getTime() - this.start) - (this.count * this.speed));

            if (this.count++ === this.steps) this.zone.run(() => this.remove());
            else if (!this.stopTime) {
                if (this.showProgressBar) this.zone.run(() => this.progressWidth += 100 / this.steps);

                this.timer = setTimeout(this.instance, (this.speed - this.diff));
            }
        })
    };

    onClick($e: MouseEvent) {

        console.log('click');
        this.item.click!.emit($e);

        if (this.clickToClose) {
            this.remove();
        }
    }

    private remove() {
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.zone.run(() => this.hanaNotificationsService.set(this.item, false))
                }, 310);
            })
        } else {
            this.hanaNotificationsService.set(this.item, false);
        }
    }
}
