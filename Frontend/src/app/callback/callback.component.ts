/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../model/property';
import { HousingService } from '../services/housing.service';

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
  email = "";
  reason = "";
  propType:any;
  public propertyId: number;

  constructor(private alert: AlertifyService, private router: Router,
              private route: ActivatedRoute, private housing: HousingService){}

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

  callme(email:string)
  { 
    if (this.fname !== "" && this.phone !== "" && this.email !=="")
    {
        this.housing.requestcall(email).subscribe();
  
        this.alert.success("Thank you " + this.fname + ", we will call you in 2 working days!");
  
          setTimeout(()=>
          {
            this.router.navigate(["/"]);
            this.ngOnInit();    
          }, 1000);
    }
    else
    {
      this.alert.error("You can't leave any field blank!")
    }
  }

}