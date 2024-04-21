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

  public getFolder()
  {
    alertify.prompt( 'Move Image', 'Enter Folder Name'  
               , function(evt:any, value:any) { localStorage.setItem("dialog",value)}
               , function() { alertify.error('Cancel') });
  }

  public getSubscriber()
  {
    alertify.prompt( 'Subscribe', 'Enter your email address', ''
               , function(evt:any, value:any) { localStorage.setItem("email",value);
                alertify.success("Thank you, please check your email!");
               }
               , function() { alertify.error('Cancel') });
  }

  public cancelSubscription()
  {

    alertify.prompt( 'Un-Subscribe', 'Enter your email address', ''
               , function(evt:any, value:any) { localStorage.setItem("unsub",value);
                alertify.success("Sorry to see you leave...See you soon");
               }
               , function() { alertify.error('Cancel') });

    //   alertify.confirm("Unsubscribe","Are you sure you want to cancel the subscription?",
    // function(){
    //   localStorage.setItem("unsub","Yes");
    // },
    // function(){
    //   localStorage.setItem("unsub","No");
    //   alertify.error('Unsubscription process has been Canceled!');
    // });
  }

}
