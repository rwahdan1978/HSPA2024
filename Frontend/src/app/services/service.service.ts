import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { HousingService } from './housing.service';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  display:any;
  token:any;
  yourTokenTimer:any;
  myToken: any;
  refresh:any;
  access:any;

constructor(private router: Router, private alertify: AlertifyService,
            private housingService: HousingService, private auth: AuthService) { }

  TokenAuth()
  {
    this.token = sessionStorage.getItem("accessToken");
    
    if (this.token != null)
    {
      setInterval (() => 
      { 
          const parseJwt = (this.token);        
          const decode = JSON.parse(atob(this.token.split('.')[1]));
          if (decode.exp * 1000 < new Date().getTime()) 
          {
            sessionStorage.removeItem('accessToken');
            localStorage.removeItem("time");
            sessionStorage.removeItem('chosenfolder');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('isAdmin');
            sessionStorage.removeItem('userId');
            this.alertify.error("Session Expired!");
            setTimeout(()=>
            {
              location.reload();
              this.router.navigate(["/"]);
            }, 3000);
          }
      }, 5000);
    }
  }

}
