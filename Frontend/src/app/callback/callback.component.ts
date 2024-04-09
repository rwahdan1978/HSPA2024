/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private alert: AlertifyService, private router: Router){}

  phone:any;
  fname:any;

  ngOnInit() {}

  callme()
  {  
    this.alert.success("Thank you " + this.fname + ", we will call you at " + this.phone + " in 2 hours!");
    this.router.navigate(["/"]);
  }

}
