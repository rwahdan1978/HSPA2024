/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../model/property';

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

  callme()
  { 
    if (this.fname !== "" && this.phone !== "")
    {
      this.alert.success("Thank you " + this.fname + ", we will call you at " + this.phone + " in 2 hours!");
      this.router.navigate(["/"]);
      this.ngOnInit();
    }
    else
    {
      this.alert.error("You can't leave any field blank!")
    }
  }

}
