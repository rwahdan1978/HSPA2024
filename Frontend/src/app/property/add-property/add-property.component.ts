/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Ikeyvaluepair } from 'src/app/model/ikeyvaluepair';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  deviveInfo: DeviceInfo;
 
  @ViewChild('formTabs') formTabs: TabsetComponent;
  datePickerConfig: Partial<BsDatepickerConfig>;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  myDateValue: Date;
  property = new Property();
  test:any;
  loggedinUser:any;
  token:any;
  public minutesleft: number = 6;
  count =0;
  minute:any;
  seconds:any;
  textSec:any;
  statSec: any;
  prefix:any;
  timer:any;
  display:any;

  
  // Will come from masters
  propertyTypes: Ikeyvaluepair[]; 
  furnishTypes: Ikeyvaluepair[];
  cityList: any[];

  propertyView: IPropertyBase = {
    id: null as any,
    name: '',
    price: '' as any,
    sellRent: 1 as number,
    propertyType: null as any,
    furnishingType: null as any,
    bhk: null as any,
    bathroom: 0 as number,
    builtArea: null as any,
    city: '' as any,
    readyToMove: false as boolean,
    projectName: null as any,
    flatNumber: '',
    villaNumber: '',
    villa: false
  };
  
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService, private http: HttpClient,
    private DDS: DeviceDetectorService) 
    {

      this.datePickerConfig = Object.assign({},{customTodayClass: 'custom-today-class',
      containerClass: 'theme-dark-blue', dateInputFormat: 'DD-MM-YYYY', 
      showWeekNumbers:false,showTodayButton: true
      
    });

    }

  ngOnInit() 
  {

    this.deviveInfo = this.DDS.getDeviceInfo();
    
    this.token = sessionStorage.getItem("accessToken");

    if (!sessionStorage.getItem('accessToken') || sessionStorage.getItem('isAdmin') === 'false')
    {
      this.alertify.error("You must be loggedIn as an Admin to add a peroperty!");
      this.router.navigate(['user/login']);
    }
    else
    {
      this.housingService.getAllCities().subscribe(data => {
        this.cityList = data;
      });
  
      this.housingService.getPropertyTypes().subscribe(data => {
        this.propertyTypes = data;
      });
  
      this.housingService.getFurnishingTypes().subscribe(data => {
        this.furnishTypes = data;
      });
  
    }
    
      window.matchMedia("(orientation:portrait)").addEventListener("change", (e: MediaQueryListEvent) => { 
        const portrait: boolean = e.matches; 
        if (portrait) { 
          location.reload(); 
        } else { 
          location.reload(); 
        } 
      });

    this.deviveInfo = this.DDS.getDeviceInfo();
    this.loggedinUser = sessionStorage.getItem('userName') || '';

    this.myDateValue = new Date();
    const thesave = document.getElementById("saveIT");
          thesave?.removeAttribute("disabled");
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm() {
    
    this.addPropertyForm = this.fb.group({

      BasicInfo: this.fb.group({
        ProjectName: [null, Validators.required],
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        Bathroom: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [0],
        Security: [0],
        Maintenance: [0],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [0],
        TotalFloor: [0],
        Address: [null, Validators.required],
        LandMark: [null], //address2
        villa:['false'],
        flatNumber:[0],
        villaNumber:[0]
      }),

      OtherInfo: this.fb.group({
        RTM: ['false'],
        PossessionOn: [null, Validators.required],
        Gated: [false],
        MainEntrance: [null],
        Description: [null],
      }),

      sellerInfo: this.fb.group({
        ContactCompany: [null, Validators.required],
        ContactName: [null],
        ContactNumber: [null],
        ContactNumber2: [null],
        ContactEmail: [null],
        ContactCommission: [null, Validators.required],
      })

      });

  }

//#region <Getter Methods>
  // #region <FormGroups>
      get BasicInfo() {
        return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
      }

      get PriceInfo() {
        return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
      }

      get AddressInfo() {
        return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
      }

      get OtherInfo() {
        return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
      }

      get sellerInfo() {
        return this.addPropertyForm.controls['sellerInfo'] as FormGroup;
      }
  // #endregion

  //#region <Form Controls>

      get ProjectName() {
        return this.BasicInfo.controls['ProjectName'] as FormControl;
      }
      get SellRent() {
        return this.BasicInfo.controls['SellRent'] as FormControl;
      }

      get BHK() {
        return this.BasicInfo.controls['BHK'] as FormControl;
      }

      get Bathroom() {
        return this.BasicInfo.controls['Bathroom'] as FormControl;
      }

      get PType() {
        return this.BasicInfo.controls['PType'] as FormControl;
      }

      get FType() {
        return this.BasicInfo.controls['FType'] as FormControl;
      }

      get Name() {
        return this.BasicInfo.controls['Name'] as FormControl;
      }

      get City() {
        return this.BasicInfo.controls['City'] as FormControl;
      }

      get Price() {
        return this.PriceInfo.controls['Price'] as FormControl;
      }

      get BuiltArea() {
        return this.PriceInfo.controls['BuiltArea'] as FormControl;
      }

      get CarpetArea() {
        return this.PriceInfo.controls['CarpetArea'] as FormControl;
      }

      get Security() {
        return this.PriceInfo.controls['Security'] as FormControl;
      }

      get Maintenance() {
        return this.PriceInfo.controls['Maintenance'] as FormControl;
      }

      get flatNumber() {
        return this.AddressInfo.controls['flatNumber'] as FormControl;
      }

      get villaNumber() {
        return this.AddressInfo.controls['villaNumber'] as FormControl;
      }

      get FloorNo() {
        return this.AddressInfo.controls['FloorNo'] as FormControl;
      }

      get TotalFloor() {
        return this.AddressInfo.controls['TotalFloor'] as FormControl;
      }

      get Address() {
        return this.AddressInfo.controls['Address'] as FormControl;
      }
      
      get LandMark() {
        return this.AddressInfo.controls['LandMark'] as FormControl;
      }

      get RTM() {
        return this.OtherInfo.controls['RTM'] as FormControl;
      }

      get PossessionOn() {
        return this.OtherInfo.controls['PossessionOn'] as FormControl;
      }

      get Gated() {
        return this.OtherInfo.controls['Gated'] as FormControl;
      }

      get MainEntrance() {
        return this.OtherInfo.controls['MainEntrance'] as FormControl;
      }

       get Description() {
         return this.OtherInfo.controls['Description'] as FormControl;
       }

      get ContactCompany() {
        return this.sellerInfo.controls['ContactCompany'] as FormControl;
      }

      get ContactName() {
        return this.sellerInfo.controls['ContactName'] as FormControl;
      }

      get ContactNumber() {
        return this.sellerInfo.controls['ContactNumber'] as FormControl;
      }

      get ContactNumber2() {
        return this.sellerInfo.controls['ContactNumber2'] as FormControl;
      }

      get ContactEmail() {
        return this.sellerInfo.controls['ContactEmail'] as FormControl;
      }

      get ContactCommission() {
        return this.sellerInfo.controls['ContactCommission'] as FormControl;
      }

  //#endregion
//#endregion

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    // add a way to create a folder
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property).subscribe(
        () => 
        {
          console.log(this.addPropertyForm);

          const thesave = document.getElementById("saveIT");
          thesave?.setAttribute("disabled","true");
    
          if(this.SellRent.value === '2') {
            setTimeout(()=>
            {
              this.test = "ok";
              this.alertify.success('Congrats, your property listed successfully on our website');
              this.router.navigate(['rent-property']);
            }, 12000);
            
          } else { 
            setTimeout(()=>
            {
              this.test = "ok";
              this.alertify.success('Congrats, your property listed successfully on our website');
              this.router.navigate(['buy-property']);
            }, 12000);
            
          }
        }
      );

    } else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  mapProperty(): void {
    //comment
    this.property.id = this.housingService.newPropID();
    this.property.projectName = this.ProjectName.value;
    this.property.sellRent = +this.SellRent.value;
    this.property.bhk = this.BHK.value;
    this.property.bathroom = this.Bathroom.value;
    this.property.propertyTypeId = this.PType.value;
    this.property.name = this.Name.value;
    this.property.cityId = this.City.value;
    this.property.furnishingTypeId = this.FType.value;
    this.property.price = +this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.villaNumber = this.villaNumber.value;
    this.property.flatNumber = this.flatNumber.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.readyToMove = this.RTM.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.estPossessionOn = 
        this.datePipe.transform(this.PossessionOn.value,"MM/dd/yyyy");
    this.property.description = this.Description.value;
   
    this.property.contactCommission = this.ContactCommission.value;
    this.property.contactCompany = this.ContactCompany.value;
    this.property.contactName = this.ContactName.value;
    this.property.contactNumber = this.ContactNumber.value;
    this.property.contactNumber2 = this.ContactNumber2.value;
    this.property.contactEmail = this.ContactEmail.value;
    
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }

    if (this.sellerInfo.invalid) {
      this.formTabs.tabs[4].active = true;
      return false;
    }

    return true;
  }

  selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }
}