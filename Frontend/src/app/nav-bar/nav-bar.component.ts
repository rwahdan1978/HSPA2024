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

  constructor(private alertify: AlertifyService, private router: Router, 
    private DDS: DeviceDetectorService) {}

  ngOnInit() {

    this.deviveInfo = this.DDS.getDeviceInfo();

    // window.matchMedia("(orientation:portrait)").addEventListener("change", (e: MediaQueryListEvent) => { 
    //   const portrait: boolean = e.matches; 
    //   if (portrait) { 
    //     location.reload(); 
    //   } else { 
    //     location.reload(); 
    //   } 
    // });
    // setInterval(() => {
    //   this.today = Date.now();
    // }, 100);
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
    // if (!sessionStorage.getItem('foo')) { 
    //   sessionStorage.setItem('foo', 'no reload') 
    //   window.location.reload() 
    // } else {
    //   sessionStorage.removeItem('foo')
    // }
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
