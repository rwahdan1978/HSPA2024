import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  deviveInfo: DeviceInfo;
  public today = Date.now();
  loggedinUser: string;
  display: any;
  token:any;
  minute:any;
  seconds:any;
  textSec:any;
  statSec:any;
  prefix:any;
  timer:any;

  constructor(private alertify: AlertifyService, private router: Router, 
    private DDS: DeviceDetectorService) {}

  ngOnInit() {

    this.deviveInfo = this.DDS.getDeviceInfo();

    this.token = sessionStorage.getItem("token");
 
    this.minute = 10;
    this.seconds = this.minute * 60;
    this.textSec = "0";
    this.statSec = 60;
    
   this.prefix = this.minute < 10 ? "0" : "";
 
   this.timer = setInterval(() => {
 
   this.seconds--;
   if (this.statSec != 0) this.statSec--;
   else this.statSec = 59;
 
   if (this.statSec < 10) {
     this.textSec = "0" + this.statSec;
   } else this.textSec = this.statSec.toString();
 
   this.display = `${this.prefix}${Math.floor(this.seconds / 60)}:${this.textSec}`;
 
   if (this.seconds == 0) {
     console.log("finished");
     clearInterval(this.timer);
   }
   }, 1000);
   
  }

  ClearAllIntervals() 
  {
    for (let i = 1; i < 99999; i++)
        window.clearInterval(i);
  }

  loggedin()
  {
      //sessionStorage.setItem('theflag', '1')
      this.loggedinUser = sessionStorage.getItem('userName') || '';
    return sessionStorage.getItem('userName'), this.loggedinUser;
  }

  onlogout()
  {
    
    localStorage.setItem('theflag', '2')
    this.ClearAllIntervals();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('chosenfolder');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('userId');
    this.router.navigateByUrl('user/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(["user/login"])});
      window.location.reload();
      this.alertify.warning("You are logged out!")
  }
}
