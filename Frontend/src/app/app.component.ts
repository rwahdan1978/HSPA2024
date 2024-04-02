/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-else-if */
import { Component, OnInit, inject } from "@angular/core";
import { IdleService } from './services/Idle.service'
import { Subscription } from "rxjs";
import { AlertifyService } from "./services/alertify.service";
import { HousingService } from "./services/housing.service";
import { AuthService } from "./services/authService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{

  constructor(private alertify: AlertifyService, private housingService: HousingService,
              private auth: AuthService) {}

  title = 'my-first-app'; 
  myToken = this.auth.getToken();

  idelService = inject(IdleService);
  private idelSubscription?: Subscription;

  ngOnInit(): void
  {

    if (this.myToken !== null)
    {

      this.idelSubscription = this.idelService.getIdleState().subscribe((isIdel:any) => 
      {
        if (isIdel)
        {
          this.idelSubscription?.unsubscribe();
          localStorage.setItem('theflag', '2')
          sessionStorage.removeItem('accessToken');
          localStorage.removeItem('display');
          sessionStorage.removeItem('chosenfolder');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('isAdmin');
          sessionStorage.removeItem('userId');
          this.alertify.error("You have not shown any activity for 3 minutes, Session Expired!")
        }
        else
        {
          console.log("its ok");
        }
      }); 

    }
    
  }

  onUserAction()
  {
    this.idelService.resetTimer();
  }

}