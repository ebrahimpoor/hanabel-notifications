import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HanaNotificationsComponent } from './components/hana-notifications.component';
import { NotificationsComponent } from './components/notification.component';
import { HanaNotificationsService } from './services/hana-notifications.service';

import { NotificationsDirective } from './notifications.directive';
import { NotificationsPipe } from './notifications.pipe';

export * from './components/hana-notifications.component';
export * from './components/notification.component';
export * from './services/hana-notifications.service';

export * from './notifications.directive';
export * from './notifications.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HanaNotificationsComponent,
    NotificationsComponent,
    NotificationsDirective,
    NotificationsPipe
  ],
  exports: [
    HanaNotificationsComponent,
    NotificationsComponent,
    NotificationsDirective,
    NotificationsPipe
  ]
})
export class HanabelNotificationsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HanabelNotificationsModule,
      providers: [HanaNotificationsService]
    };
  }
}
