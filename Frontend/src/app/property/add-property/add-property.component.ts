import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import {GetVariableService} from '../getVariable.service';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import AWSS3UploadAsh from 'aws-s3-upload-ash';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  deviveInfo: DeviceInfo;
  mall: any;
  fastFood: any;
  zoo:any;
  beach:any;
  school:any;
  mosque:any;

  @ViewChild('formTabs') formTabs: TabsetComponent;
  datePickerConfig: Partial<BsDatepickerConfig>;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  myDateValue: Date;
  property = new Property();
  test:any;
  loggedinUser:any;
  
  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Villa']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']
  cityList: any[];

  propertyView: IPropertyBase = {
    id: null as any,
    name: '',
    price: null as any,
    sellRent: null as any,
    propertyType: null as any,
    building_flat: null as any,
    villa: null as any,
    furnishingType: null as any,
    bhk: null as any,
    builtArea: null as any,
    city: '' as any,
    readyToMove: null as any,
    projectName: null as any
  };
  
  constructor(
    private fb: FormBuilder,
    private router: Router, private getVariable: GetVariableService,
    private housingService: HousingService,
    private alertify: AlertifyService, private http: HttpClient,
    private DDS: DeviceDetectorService) 
    {
      this.datePickerConfig = Object.assign({},{customTodayClass: 'custom-today-class',
      containerClass: 'theme-dark-blue', dateInputFormat: 'DD-MM-YYYY', 
      showWeekNumbers:false,showTodayButton: true
    });

    }

  ngOnInit() {

    console.log("hi there!")
    this.housingService.getAllCities().subscribe(data => {
      this.cityList = data;
    });

    const config = {
      bucketName: 'angular-upload-files-2023-2024',
      dirName: '/properties2023/',
      region: 'ap-south-1',
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      s3Url: 'https://angular-upload-files-2023-2024.s3.amazonaws.com/'
  }
  
  const S3CustomClient = new AWSS3UploadAsh(config);

    window.matchMedia("(orientation:portrait)").addEventListener("change", (e: MediaQueryListEvent) => { 
      const portrait: boolean = e.matches; 
      if (portrait) { 
        location.reload(); 
      } else { 
        location.reload(); 
      } 
    });

    this.housingService.getAllCities().subscribe(data => {
      this.cityList = data;
      console.log(data);
    });

    this.deviveInfo = this.DDS.getDeviceInfo();
    this.loggedinUser = localStorage.getItem('userName') || '';

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
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null], //address2
        building_flat:[null],
        villa:[null]
      }),

      OtherInfo: this.fb.group({
        RTM: [null],
        PossessionOn: [null],
        AOP: [null, Validators.required],
        PA: [null,  Validators.required],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
        Interests: [null]
      }),

      sellerInfo: this.fb.group({
        contactCompany: [null],
        contactName: [null],
        contactNumber: [null],
        contactNumber2: [null],
        contactEmail: [null],
        contactCommission: [null]
      }),

      PhotoInfo: this.fb.group({
        Image1: [null],
        Image2: [null],
        Image3: [null],
        Image4: [null],
        Image5: [null],
        companyImage: [null]
      }),

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

      get PhotoInfo() {
        return this.addPropertyForm.controls['PhotoInfo'] as FormGroup;
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

      get FloorNo() {
        return this.AddressInfo.controls['FloorNo'] as FormControl;
      }

      get TotalFloor() {
        return this.AddressInfo.controls['TotalFloor'] as FormControl;
      }

      get Address() {
        return this.AddressInfo.controls['Address'] as FormControl;
      }
      //address2
      get LandMark() {
        return this.AddressInfo.controls['LandMark'] as FormControl;
      }

      get building_flat() {
        return this.AddressInfo.controls['building_flat'] as FormControl;
      }

      get villa() {
        return this.AddressInfo.controls['villa'] as FormControl;
      }

      get RTM() {
        return this.OtherInfo.controls['RTM'] as FormControl;
      }

      get PossessionOn() {
        return this.OtherInfo.controls['PossessionOn'] as FormControl;
      }

      get AOP() {
        return this.OtherInfo.controls['AOP'] as FormControl;
      }

      get PA() {
        return this.OtherInfo.controls['PA'] as FormControl;
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

      get Interests() {
        return this.OtherInfo.controls['Interests'] as FormControl;
      }

      get Image1() {
        return this.PhotoInfo.controls['Image1'] as FormControl;
      }

      get Image2() {
        return this.PhotoInfo.controls['Image2'] as FormControl;
      }

      get Image3() {
        return this.PhotoInfo.controls['Image3'] as FormControl;
      }

      get Image4() {
        return this.PhotoInfo.controls['Image4'] as FormControl;
      }

      get Image5() {
        return this.PhotoInfo.controls['Image5'] as FormControl;
      }

      get contactCompany() {
        return this.sellerInfo.controls['contactCompany'] as FormControl;
      }

      get contactName() {
        return this.sellerInfo.controls['contactName'] as FormControl;
      }

      get contactNumber() {
        return this.sellerInfo.controls['contactNumber'] as FormControl;
      }

      get contactNumber2() {
        return this.sellerInfo.controls['contactNumber2'] as FormControl;
      }

      get contactEmail() {
        return this.sellerInfo.controls['contactEmail'] as FormControl;
      }

      get contactCommission() {
        return this.sellerInfo.controls['contactCommission'] as FormControl;
      }

      get companyImage() {
        return this.PhotoInfo.controls['companyImage'] as FormControl;
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
      this.housingService.addProperty(this.property);
      console.log(this.addPropertyForm);

      const thesave = document.getElementById("saveIT");
      thesave?.setAttribute("disabled","true");

      if(this.SellRent.value === '2') {
        setTimeout(()=>
        {
          this.test = "ok";
          this.alertify.success('Congrats, your property listed successfully on our website');
          this.router.navigate(['/rent-property']);
        }, 12000);
        
      } else { 
        setTimeout(()=>
        {
          this.test = "ok";
          this.alertify.success('Congrats, your property listed successfully on our website');
          this.router.navigate(['/buy-property']);
        }, 12000);
        
      }

    } else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  mapProperty(): void {
    //comment
    this.property.id = this.housingService.newPropID();
    //this.property.projectName = this.ProjectName.value;
    this.property.sellRent = +this.SellRent.value;
    this.property.bhk = this.BHK.value;
    this.property.propertyType = this.PType.value;
    this.property.name = this.Name.value;
    this.property.city = this.City.value;
    this.property.furnishingType = this.FType.value;
    this.property.price = this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloor = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    //this.property.Building_Flat = this.building_flat.value;
    //this.property.Villa = this.villa.value;
    this.property.readyToMove = this.RTM.value;
    this.property.age = this.AOP.value;
    this.property.propertyType = this.PA.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.estPossessionOn = this.PossessionOn.value;
    this.property.description = this.Description.value;
   // this.property.image1 = this.getVariable.theFileName1;
   // this.property.Image2 = this.getVariable.theFileName2;
   // this.property.Image3 = this.getVariable.theFileName3;
   // this.property.Image4 = this.getVariable.theFileName4;
   // this.property.Image5 = this.getVariable.theFileName5;
    // this.property.companyImage = this.getVariable.theFileName6;
    // this.property.contactCommission = this.contactCommission.value;
    // this.property.contactCompany = this.contactCompany.value;
    // this.property.contactName = this.contactName.value;
    // this.property.contactNumber = this.contactNumber.value;
    // this.property.contactNumber2 = this.contactNumber2.value;
    // this.property.contactEmail = this.contactEmail.value;
    // this.property.theaddress = this.contactCompany.value;
    // this.property.mall = this.mall;
    // this.property.zoo = this.zoo;
    // this.property.fastFood = this.fastFood;
    // this.property.beach = this.beach;
    // this.property.school = this.school;
    // this.property.mosque = this.mosque;
  }

  checkCheckBoxvalue1(event:any){
    this.mall = event.checked;
  }

  checkCheckBoxvalue2(event:any){
    this.zoo = event.checked;
  }

  checkCheckBoxvalue3(event:any){
    this.fastFood = event.checked;
  }

  checkCheckBoxvalue4(event:any){
    this.beach = event.checked;
  }

  checkCheckBoxvalue5(event:any){
    this.school = event.checked;
  }

  checkCheckBoxvalue6(event:any){
    this.mosque = event.checked;
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

    if (this.PhotoInfo.invalid) {
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