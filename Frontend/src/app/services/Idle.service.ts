/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {Subject, Observable, interval, Subscription } from 'rxjs';
import { throttle } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  
  private IdleSubject = new Subject<boolean>();
  private timeout = 180;
  private lastActivity?: Date;
  private idleCheckInterval = 5;
  private idelSubscription?: Subscription;

constructor() { 
  this.resetTimer();
  this.startWatching();
}

getIdleState(): Observable<boolean>{
  return this.IdleSubject.asObservable();
}

private startWatching()
{
  this.idelSubscription = interval(this.idleCheckInterval * 1000).pipe(
    throttle(() => interval(1000))
  ).subscribe(() => {
    const now = new Date();

    if (
          now.getTime() - this.lastActivity?.getTime()! > 
          this.timeout * 1000
       )
       {
          this.IdleSubject.next(true);
       }
  });
}

resetTimer()
{
  this.lastActivity = new Date();
  this.IdleSubject.next(false);
}

stopWatching()
{
  if (this.idelSubscription)
  {
    this.idelSubscription.unsubscribe();
  }
}

}
