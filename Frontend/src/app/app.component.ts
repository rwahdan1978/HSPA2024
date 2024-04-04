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
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ServiceService } from "./services/service.service";

const KEY = 'time'
const DEFAULT = 900

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{

  token:any;
  //notify 1 not to display in localstorage and 0 to display!
  config: CountdownConfig = {leftTime: DEFAULT, notify: 0}

  constructor(private alertify: AlertifyService,
              private auth: AuthService, private tokenAuth: ServiceService) {}

  title = 'my-first-app'; 
  myToken = this.auth.getToken();

  idelService = inject(IdleService);
  private idelSubscription?: Subscription;

  ngOnInit(): void
  {
    this.token = sessionStorage.getItem("accessToken");

    if (sessionStorage.getItem("accessToken") != null)
    {
      this.tokenAuth.TokenAuth();
    }

    if (this.token !== null)
    {
      const KEY = 'time'
      const DEFAULT = 900
      let value = +localStorage.getItem(KEY) ?? DEFAULT;
      if (value <= 0) value = DEFAULT
      this.config = {...this.config, leftTime: value }
    }
    else{
      localStorage.removeItem("time");
    }


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

  handleEvent(ev: CountdownEvent) {
    //console.log(ev)
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }
    if (localStorage.getItem("time") === '120'){
      this.alertify.warning("!!!Warning!!! 2 minutes left to end the session.")
    }
  }

  onUserAction()
  {
    this.idelService.resetTimer();
  }

}