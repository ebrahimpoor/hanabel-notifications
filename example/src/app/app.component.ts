import { Component } from '@angular/core';

import { HanaNotificationsService } from '../notification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'HANA';

    public notificationOptions = {
        timeOut: 50000,
        position: ["top", "right"],
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 10
    };

    constructor(private hanaNotificationsService: HanaNotificationsService) {

    }

    success(){
        
        this.hanaNotificationsService.success('TEST SUCCESS', 'CONTENT');

    }

    error(){
        
        this.hanaNotificationsService.error('TEST ERROR', 'CONTENT');

    }

    info(){
        
        this.hanaNotificationsService.info('TEST INFO', 'CONTENT');

    }

}
