/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})

export class PropertyListComponent implements OnInit{
  
  deviveInfo: DeviceInfo;
  public SellRent = 0;
  properties: IPropertyBase[];
  City ='';
  SearchCity = '';
  Prop = '';
  SearchProp = '';
  SortbyParam = '';
  SearchCar = '';
  SortDirection = 'asc';

  collection:any = [];
  p:any = 0;

  constructor(private route: ActivatedRoute, 
              private housingService: HousingService,
              private DDS: DeviceDetectorService,
              private location: LocationStrategy) { 

                history.pushState(null, '', window.location.href);  
                this.location.onPopState(() => {
                history.pushState(null, '', window.location.href);
              });  

    for (let i:number = 0; i<=1000; i++){
      this.collection.push(i as never);
    }

  }

  ngOnInit(): void{

      this.deviveInfo = this.DDS.getDeviceInfo();

      window.matchMedia("(orientation:portrait)").addEventListener("change", (e: MediaQueryListEvent) => { 
        const portrait: boolean = e.matches; 
        if (portrait) { 
          location.reload(); 
        } else { 
          location.reload(); 
        } 
      });

      if (this.route.snapshot.url.toString()==="buy-property"){
        this.SellRent = 1;
      }if (this.route.snapshot.url.toString()==="rent-property"){
        this.SellRent = 2;
      }
      
      if (this.SellRent == 1 || this.SellRent == 2)
      {
        this.housingService.getAllProperties(this.SellRent).subscribe(
          data=> {
                this.properties = data;
          }, error => {
            console.log(error);
          }
        );
      }
      else
      {
        this.housingService.getAllProperties1().subscribe(
          data=> {
                this.properties = data;
          }, error => {
            console.log(error);
          }
        );
      }
  }
 
  onCityFilter(){
    this.SearchCity = this.City;
  }

  ClearList(){
    this.SearchCity = '';
    this.City = '';
    this.SearchProp = '';
    this.Prop = '';
  }

  onCityFilterClear(){
    this.SearchCity = '';
    this.City = '';
    this.SearchProp = '';
    this.SearchCar = '';
    this.Prop = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

}
