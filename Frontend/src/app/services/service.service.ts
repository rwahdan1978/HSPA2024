import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  display:any;

constructor(private router: Router, private alertify: AlertifyService) { }

  TokenAuth()
  {
    const token = sessionStorage.getItem("token");
    let minutesleft = 8;
  
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
          minutesleft = minutesleft - 2;
          if (minutesleft != 2)
          {
            this.alertify.warning("Session will expire in " + minutesleft + " minutes");
          }
          else if (minutesleft == 2)
          {
            this.alertify.warning("Final warning, session will expire in " + minutesleft + " minutes");
          }
        }
        
      }, 120000);
  }

}
