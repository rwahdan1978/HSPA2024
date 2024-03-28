import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  display:any;
  minutesleft:any;
  token:any;
  yourTokenTimer:any;
  myToken: any;

constructor(private router: Router, private alertify: AlertifyService) { }

  TokenAuth()
  {
    const token = sessionStorage.getItem("token");
    this.minutesleft = 4;
  
    setInterval (() => { 
  
        const parseJwt = (token);        
        const decode = JSON.parse(atob(token.split('.')[1]));
        console.log(decode);
        if (decode.exp * 1000 < new Date().getTime()) 
        {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('chosenfolder');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('isAdmin');
          sessionStorage.removeItem('userId');
          this.router.navigate(["user/login"]);
          this.alertify.error("Session Expired!")
        }
        else
        {
          this.minutesleft = this.minutesleft - 2;
        }

          if (this.minutesleft === 2)
          {
            this.alertify.warning("!!!WARNING!!!, Session will expire in " + this.minutesleft + " minutes");
          }
          
        
      }, 120000);
  }

}
