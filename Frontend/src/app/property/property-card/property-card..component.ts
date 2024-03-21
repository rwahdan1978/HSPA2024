import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({

    selector: 'app-property-card',
    //template: '<h1>This is my card!</h1>',
    templateUrl: 'property-card.component.html',
    //styles: ['h1 {font-weight: normal;}']
    styleUrls: ['property-card.component.css']


})

export class PropertycardComponent implements OnInit
{ 
    token:any;
    deviveInfo: DeviceInfo;
    @Input() property : IPropertyBase;
    @Input() hideIcons: boolean;

    constructor(private DDS: DeviceDetectorService,
                private alertify: AlertifyService,
                private router: Router) { }

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
}