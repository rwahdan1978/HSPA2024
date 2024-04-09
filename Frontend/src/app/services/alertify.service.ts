/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs'; 

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message: string)
  {
    alertify.set('notifier','delay', 10);
    alertify.success(message);
  }

  warning(message: string)
  {
    alertify.set('notifier','delay', 10);
    alertify.warning(message);
  }

  error(message: string)
  {
    alertify.set('notifier','delay', 10);
    alertify.error(message);
  }

}
