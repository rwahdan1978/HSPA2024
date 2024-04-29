/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Subscription',
  templateUrl: './Subscription.component.html',
  styleUrls: ['./Subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  pname:any;
  filename:any;
  filename1:any;

  constructor(private alertify:AlertifyService, private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('accessToken') || sessionStorage.getItem('isAdmin') === 'false')
      {
        this.alertify.error("You must be loggedIn as an Admin to access newletter generator!");
        this.router.navigate(['/']);
      }
  }

  publishNews()
  {
    console.log(this.pname);
  }

}
