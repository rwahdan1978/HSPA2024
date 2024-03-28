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

export class AppComponent implements OnInit
{

  constructor(private alertify: AlertifyService) {}

  title = 'my-first-app'; 
  token = sessionStorage.getItem("token");

  idelService = inject(IdleService);
  private idelSubscription?: Subscription;

  ngOnInit(): void
  {

    if (this.token !== null)
    {

      this.idelSubscription = this.idelService.getIdleState().subscribe((isIdel:any) => 
      {
        if (isIdel)
        {
          this.idelSubscription.unsubscribe();
          localStorage.setItem('theflag', '2')
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('tokenexpiry');
          localStorage.removeItem('display');
          sessionStorage.removeItem('chosenfolder');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('isAdmin');
          sessionStorage.removeItem('userId');
          this.alertify.error("You have not shown any activity for 2 minutes, Session Expired!")
        }
        else
        {
          console.log("active");
        }
      }); 

    }
    
  }

  onUserAction()
  {
    this.idelService.resetTimer();
  }

}