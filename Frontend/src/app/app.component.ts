/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-else-if */
import { Component, Inject, OnDestroy, OnInit, inject } from "@angular/core";
import { IdleService } from './services/Idle.service'
import { Subscription } from "rxjs";
import { AlertifyService } from "./services/alertify.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy
{
  title = 'my-first-app'; 

  idelService = inject(IdleService);
  private idelSubscription?: Subscription;

  ngOnInit(): void
  {
    this.idelSubscription = this.idelService.getIdleState().subscribe((isIdel:any) => 
    {
      if (isIdel)
      {
        alert("user is idle!");
      }
    }); 
  }

  ngOnDestroy(): void 
  {

    if (this.idelSubscription)
    {
      this.idelSubscription.unsubscribe();
    }
    
  }

  onUserAction()
  {
    this.idelService.resetTimer();
  }

}