import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, retryWhen } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { ErrorCode } from 'enums/enums';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private alertify: AlertifyService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log('HTTP Request started');
        return next.handle(request)
            .pipe(
                retryWhen(error => this.retryRequest(error,6)),
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.setError(error);
                    console.log(error);
                    this.alertify.error(errorMessage);
                    return throwError(errorMessage);
                })
            );
    }

    retryRequest(error:Observable<any>, retryCount: number): Observable<any>
    {
        return error.pipe (
            concatMap((chekErr: HttpErrorResponse, count: number) => {
                
                if (count <= retryCount)
                {
                   switch(chekErr.status)
                   {
                    case ErrorCode.serverDown:
                        return of(chekErr)
                    case ErrorCode.unauthorized:
                        return of(chekErr)
                   }
                }

                return throwError(chekErr);
            })  
          )
    }

    setError(error: HttpErrorResponse): string {
        let errorMessage = 'Unknown error occured';
        if(error.error instanceof ErrorEvent) {
            // Client side error
            errorMessage = error.error.message;
        } else {
            // server side error
            
            if (error.error.errorMessage && error.status===401) {
                return error.statusText;
            }

            if (error.status!==0) {
                errorMessage = error.error.errorMessage;
            }
        }
        return errorMessage;
    }
}