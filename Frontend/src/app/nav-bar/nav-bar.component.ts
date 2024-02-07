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

  onFamilyDocs(){
    window.open(
      'https://family-documents.onrender.com/',
      '_self' // <- This is what makes it open in a new window.
    );
  }

  loggedin()
  {
    this.loggedinUser = localStorage.getItem('token') || '';
    return localStorage.getItem('token'), this.loggedinUser;
  }

  onlogout()
  {
    localStorage.removeItem('token');
    this.alertify.error("You are logged out!")
    this.router.navigate(['/']);
  }
}
