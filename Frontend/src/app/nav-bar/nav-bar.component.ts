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

  constructor(private alertify: AlertifyService, private router: Router, private DDS: DeviceDetectorService) { }

  ngOnInit() {

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
