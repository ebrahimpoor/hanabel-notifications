import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[notificationsDirective]'
})
export class NotificationsDirective {

  constructor(private el: ElementRef) {
  }

}
