import { Component, HostListener, OnInit } from '@angular/core';
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
  display = "";
  token:any;
  minute =0;
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
    clearInterval(this.timer);
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
