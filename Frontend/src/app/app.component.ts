/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-else-if */
import { Component, OnInit, inject } from "@angular/core";
import { IdleService } from './services/Idle.service'
import { Subscription } from "rxjs";
import { AlertifyService } from "./services/alertify.service";
import { AuthService } from "./services/authService";
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ServiceService } from "./services/service.service";
import { Router } from "@angular/router";
import emailjs from '@emailjs/browser';
import { HousingService } from "./services/housing.service";

const KEY = 'time'
const DEFAULT = 900

declare let bundle: any; //declare bundle.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{

  token:any;
  theEmail:any;
  properties:any;

  //notify 1 not to display in localstorage and 0 to display!
  config: CountdownConfig = {leftTime: DEFAULT,format: 'm:ss', notify: 0}

  constructor(private alertify: AlertifyService,
              private auth: AuthService, private tokenAuth: ServiceService,
              private router:Router, private alert: AlertifyService,
              private housingService: HousingService) {}

  title = 'my-first-app'; 
  myToken = this.auth.getToken();

  idelService = inject(IdleService);
  private idelSubscription?: Subscription;

  ngOnInit(): void
  {

    localStorage.removeItem("email");
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
          localStorage.removeItem('dialog');
          sessionStorage.removeItem('accessToken');
          localStorage.removeItem('display');
          sessionStorage.removeItem('chosenfolder');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('isAdmin');
          sessionStorage.removeItem('userId');
          localStorage.removeItem("time");
          this.alertify.error("You have not shown any activity for 3 minutes, Session Expired!")
          setTimeout(()=>
          {
            location.reload();
            this.router.navigate(["/"]);
          }, 3000);
        }
        else
        {
          const thedate = new Date().toString().split(' ')[4];
          console.log("last activity @" + " " + thedate);
        }
      }); 

    }

    bundle();
    
  }

  subscribe()
  {
    this.alert.getSubscriber();

        //this will save the email to subscribers list in db
        setTimeout(async() =>
          {

            this.housingService.subscribeEmail(localStorage.getItem("email")).subscribe();
            
            //this is emailjs public key!
            emailjs.init("mh3EOs4Jy3aEXCESu");
              
              let response = await emailjs.send("service_aw38095","template_ulk83wm",{
                to_name: "Admin",
                user_name: "New Subscriber",
                user_email: localStorage.getItem("email"),
                subject: "Subscription",
                message: "New subscription!",
                });

          }, 30000);
  }

  unsubscribe()
  {
    this.alert.cancelSubscription();
    
    setTimeout(() =>
    { 
      const email = localStorage.getItem("unsub");
      this.housingService.getNewsletterId(email).subscribe(data =>
      {
        let theID = JSON.stringify(data, ["id"]);
        let theID2 = JSON.parse(theID);
        this.housingService.unsubscribe(+theID2.id).subscribe();
        });
    }, 20000);
    
  }

  handleEvent(ev: CountdownEvent) {
    //console.log(ev)
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }

    if (localStorage.getItem("time") === '60'){
      document.getElementById('timer').style.color="red";
      this.alertify.warning("!!!Warning!!! 1 minute left to end the session.")
    }
  }

  onUserAction()
  {
    this.idelService.resetTimer();
  }

}