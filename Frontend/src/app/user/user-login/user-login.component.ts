import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/authService';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { UserForLogin } from 'src/app/model/user';
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  deviveInfo: DeviceInfo;

  constructor(private authServive: AuthService, 
              private alertify: AlertifyService,
              private router: Router, private DDS: DeviceDetectorService) { }

  ngOnInit() {
    window.matchMedia("(orientation:portrait)").addEventListener("change", (e: MediaQueryListEvent) => { 
      const portrait: boolean = e.matches; 
      if (portrait) { 
        location.reload(); 
      } else { 
        location.reload(); 
      } 
    });
    
    this.deviveInfo = this.DDS.getDeviceInfo();
  }

  onlogin(loginForm: NgForm){
    
    console.log(loginForm.value);
    this.authServive.authUser(loginForm.value).subscribe(
      
      (response: UserForLogin|any) => {

        const user = response;
        const token = user.token;
        const myToken = jwtDecode(token);
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('tokenexpiry', JSON.stringify(jwtDecode(token).exp));
        sessionStorage.setItem('userName', user.userName);
        sessionStorage.setItem('isAdmin', user.isAdmin);
        sessionStorage.setItem('userId', user.userId);
        this.alertify.success("You have loged-in successfully!");
        console.log(myToken);
        this.router.navigate(["/"]); 
        //window.location.reload();
        
      }
  );
  }
}
