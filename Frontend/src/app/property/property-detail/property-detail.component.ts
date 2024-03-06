/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Property } from 'src/app/model/property';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DomSanitizer} from '@angular/platform-browser';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { filter, first } from 'rxjs';
import { HousingService } from 'src/app/services/housing.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import 'hammerjs';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})

export class PropertyDetailComponent implements OnInit {

  public mainPhotoUrl: string;
  deviveInfo: DeviceInfo;
  public urlPath: any;
  public theIndex: any = 0;

  @ViewChild('iframe') iframe: ElementRef

  form: FormGroup = this.fb.group({
    from_name: [null, Validators.required],
    to_name: ['Admin', Validators.required],
    from_email: [null, Validators.required],
    subject: [null, Validators.required],
    message: [null, Validators.required],
  });

  form1: FormGroup = this.fb.group({
    from_name1: [null, Validators.required],
    to_name1: ['Admin', Validators.required],
    from_email1: [null, Validators.required],
    subject1: [null, Validators.required],
    message1: [null, Validators.required],
  });

  public propertyId: number;
  property: any = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  theArray: Array<any> = [];
  likes: number;
  propid: number;
  propidStr: string;
  submitted: any;
  selectedIndex: any;

    http: any;
    theButton: any;

    visable1: boolean = false;
    visable2: boolean = true;
    currentTabId = 0;
    token: any;
    dangerousUrl:any;
  _activatedRoute: any;
  transactionTabIndex: any;
  loggedinUser: string;
   
  constructor(private route: ActivatedRoute, private alert: AlertifyService, 
              private fb: FormBuilder, private sanitizer: DomSanitizer, 
              private DDS: DeviceDetectorService, private router: Router,
              private housingService: HousingService) {}

  ngOnInit() 
  {
    const savedTabIndex = localStorage.getItem('lastTab');
    this.selectedIndex= savedTabIndex;

    this.loggedinUser = localStorage.getItem('userName') || '';

    this.deviveInfo = this.DDS.getDeviceInfo();
    this.form.controls['subject'].disable();
    this.form1.controls['subject1'].disable();
    this.token = localStorage.getItem('token');
    
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: any) => {
        this.property = data['prp'];
      }
    )

    this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);

    // check if user navigate to other page and delete the lastTab in local storage
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd && !e.url.startsWith('claim')),
        first()
      )
      .subscribe(() => {
        localStorage.removeItem('lastTab');
      });

    this.propid = this.propertyId;
    this.propidStr = "nums" + this.propid.toString()

    let data2:any = localStorage.getItem(this.propidStr);
    this.likes = JSON.parse(data2);

    setTimeout(() => {
      this.dangerousUrl = "https://www.google.com/maps?q=" + this.property.contactCompany + "&output=embed";
      this.urlPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
    }, 100);

     this.galleryOptions = [
      {
        width: '100%',
        height: '100%',

        previewForceFullscreen: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewAutoPlay:true,
        previewKeyboardNavigation: true,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.getPropertyPhotos();

    return this.urlPath;

  }

  changePrimaryPhoto(mainPhotoUrl: string)
  {
    this.mainPhotoUrl = mainPhotoUrl;
  }

  getPropertyPhotos(): NgxGalleryImage[]
  {
    const photoUrls: NgxGalleryImage[] = [];
    for (const photo of this.property.photos)
    {

      console.log(photo.publicId);

      if(photo.isPrimary) 
      {
        this.mainPhotoUrl = photo.imageUrl;
      }
      else
      {
        photoUrls.push(
          {
            small: photo.imageUrl,
            medium: photo.imageUrl,
            big: photo.imageUrl
          }
        );
      }
    }
    return photoUrls;                
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {

    localStorage.removeItem('lastTab');
    this.theIndex = tabChangeEvent.index;
    localStorage.setItem('lastTab', this.theIndex);

    if (!localStorage.getItem('userName') && 
         (localStorage.getItem('lastTab')=== '3'))
    {
      this.alert.error("You must be loggedIn as an Admin to add photos!");
      this.router.navigate(['/user/login']);
    }

    if (localStorage.getItem('userName') && 
         (localStorage.getItem('lastTab')=== '3') 
        && (localStorage.getItem('isAdmin') === 'false'))
    {
      this.alert.error("You must be loggedIn as an Admin to add photos!");
      this.router.navigate(['/user/login']);
    }

    if ((localStorage.getItem('userId') != this.property.postedBy) && 
       (localStorage.getItem('lastTab')=== '3'))
    {
      this.alert.error("You are not authorized to add photos to this property!");
      this.router.navigate(['/user/login']);
    }

  }

  showImage(){
    this.visable1 = true;
    this.visable2 = false;
   // this.currentTabId = 2;
  }

  hideImage(){
    this.visable1 = false;
    this.visable2 = true;
  //  this.currentTabId = 2;
  } 

  addLike(element:any){

    this.propidStr = "nums" + this.propid.toString()
    
      this.likes += 1;
      let data = element.textContent = this.likes;
      localStorage.setItem(this.propidStr,JSON.stringify(data));
      window.location.reload();
    
  }

  async send(){

    if (this.form.valid)
    {
      this.theButton = document.getElementById("clickit");
      this.theButton.setAttribute("hidden",true);

      emailjs.init("IclaYU2yrPjG2MHfm");
      let response = await emailjs.send("service_ytxrv42","template_6j13ark",{
        to_name: "Admin",
        from_name: this.form.value.from_name,
        from_email: this.form.value.from_email,
        subject:  this.property.projectName + "    " + this.property.name + "," + this.property.city,
        message: this.form.value.message,
        });

        this.alert.success("email sent");

        setTimeout(()=>
        {
          location.reload();     
        }, 1000);
      }    
      else
      {
        this.currentTabId = 3;
        this.alert.error("Please fill all fields!")
      }  
  }

  async send1(){

    if (this.form1.valid)
    {
      this.theButton = document.getElementById("clickit2");
      this.theButton.setAttribute("hidden",true);

      emailjs.init("IclaYU2yrPjG2MHfm");
      let response = await emailjs.send("service_ytxrv42","template_6j13ark",{
        to_name: "Admin",
        from_name: this.form.value.from_name1,
        from_email: this.form.value.from_email1,
        subject:  this.property.projectName + "    " + this.property.name + "," + this.property.city,
        message: this.form.value.message1,
        });

        this.alert.success("email sent");

        setTimeout(()=>
        {
          location.reload();     
        }, 1000);
      }    
      else
      {
        this.currentTabId = 3;
        this.alert.error("Please fill all fields!")
      }  
  }

}
