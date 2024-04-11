/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../model/property';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  @ViewChild('iframe') iframe: ElementRef

  property: any = new Property();
  phone = "";
  fname = "";
  propType:any;
  public propertyId: number;

  constructor(private alert: AlertifyService, private router: Router,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: any) => {
        this.property = data['prp2'];
      }
    )

    if (this.property.sellRent === 1)
    {
      this.propType = "For Sale";
    }
    else
    {
      this.propType = "For Rent";
    }

  }

  async callme()
  { 
    if (this.fname !== "" && this.phone !== "")
    {
        emailjs.init("IclaYU2yrPjG2MHfm");
        let response = await emailjs.send("service_ytxrv42","template_6j13ark",{
          to_name: "Admin",
          from_name: this.fname,
          from_email: "user@gmail.com",
          subject:  this.property.projectName + "    " + this.property.name + "," + this.property.city,
          message: "Please call me back at " + this.phone,
          });
  
          this.alert.success("Thank you " + this.fname + ", we will call you in 2 working days!");
  
          setTimeout(()=>
          {
            this.router.navigate(["/"]);
            this.ngOnInit();    
          }, 2000);
    }
    else
    {
      this.alert.error("You can't leave any field blank!")
    }
  }

}
