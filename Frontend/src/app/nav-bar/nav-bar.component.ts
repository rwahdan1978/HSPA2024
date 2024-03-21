import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { timer } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  deviveInfo: DeviceInfo;
  public today = Date.now();
  loggedinUser: string;
  token:any;

  constructor(private alertify: AlertifyService, private router: Router, private DDS: DeviceDetectorService) { }

  ngOnInit() {

    this.token = localStorage.getItem("token");

    timer(0, 600000).subscribe(() => { 

      const parseJwt = (this.token);        
      const decode = JSON.parse(atob(this.token.split('.')[1]));
      console.log(decode);
      if (decode.exp * 1000 < new Date().getTime()) 
      {
        localStorage.removeItem('token');
        localStorage.removeItem('chosenfolder');
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userId');
        this.router.navigate(["user/login"]);
        this.alertify.error("Session Expired!")
      }
      
    });

    this.deviveInfo = this.DDS.getDeviceInfo();

    window.matchMedia("(orientation:portrait)").addEventListener("change", (e: MediaQueryListEvent) => { 
      const portrait: boolean = e.matches; 
      if (portrait) { 
        location.reload(); 
      } else { 
        location.reload(); 
      } 
    });
    setInterval(() => {
      this.today = Date.now();
    }, 100);
  }

  loggedin()
  {
    this.loggedinUser = localStorage.getItem('userName') || '';
    return localStorage.getItem('userName'), this.loggedinUser;
  }

  onlogout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('chosenfolder');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    this.alertify.warning("You are logged out!")
    this.router.navigate(['/']);
  }
}
