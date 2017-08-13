import { Injectable, PipeTransform, Pipe } from '@angular/core';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'notificationsPipe'
})
@Injectable()
export class NotificationsPipe implements PipeTransform {
  transform(value: any, args: any[] = null): string {
    return value;
  }
}
