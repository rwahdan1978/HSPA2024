import { TokenApiModel } from '../model/token.api.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/authService';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { token } from 'aws-sdk/clients/sns';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const myToken = this.auth.getToken();
    console.log("token is ok...")

    // this.start.load();
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: "Bearer "+ myToken}
      })
    }

    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            //this.router.navigate(['login'])
            //handle
            return this.handleUnAuthorizedError(request,next);
          }
        }
        return throwError(()=> err)
      })
    );
  }
  
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    const myToken = this.auth.getToken();
    const tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = this.auth.getToken()!;
    tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokeApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:"Bearer " + myToken}
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
          this.router.navigate(['login'])
        })
      })
    )
  }
}
