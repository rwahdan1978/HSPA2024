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
  minutesleft:any;
  token:any;
  yourTokenTimer:any;
  myToken: any;
  refresh:any;
  access:any;

constructor(private router: Router, private alertify: AlertifyService,
            private housingService: HousingService, private auth: AuthService) { }

  TokenAuth()
  {
    const token = sessionStorage.getItem("accessToken");
    this.minutesleft = 15;
  
    setInterval (() => { 
  
        const parseJwt = (token);        
        const decode = JSON.parse(atob(token.split('.')[1]));
        if (decode.exp * 1000 < new Date().getTime()) 
        {

                // const myToken = this.auth.getToken();
                // const tokeApiModel = new TokenApiModel();
                // tokeApiModel.accessToken = this.auth.getToken()!;
                // tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
                // return this.auth.renewToken(tokeApiModel)
                // .pipe(
                // switchMap((data:TokenApiModel)=>{
                //     this.auth.storeRefreshToken(data.refreshToken);
                //     this.auth.storeToken(data.accessToken);
                //     return "data";
                //   }),
                
                //   )
          sessionStorage.removeItem('accessToken');
          // sessionStorage.removeItem('refreshToken');
          sessionStorage.removeItem('chosenfolder');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('isAdmin');
          sessionStorage.removeItem('userId');
          // this.router.navigate(["user/login"]);
          this.alertify.error("Session Expired!")
        }
        else
        {
          this.minutesleft = this.minutesleft - 3;
          this.alertify.warning("!!!WARNING!!!, Session will expire in " + this.minutesleft + " minutes");
        } 
        
      }, 180000);
  }

}
