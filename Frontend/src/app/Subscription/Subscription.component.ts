/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Subscription',
  templateUrl: './Subscription.component.html',
  styleUrls: ['./Subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  pname:any;
  filename:any;
  desc:any;

  uploader: FileUploader;
  baseUrl = environment.baseUrl;
  maxAllowedFileSize = 10*1024*1024;

  constructor(private alertify:AlertifyService, private router: Router) { }

  ngOnInit() 
  {
    if (!sessionStorage.getItem('accessToken') || sessionStorage.getItem('isAdmin') === 'false')
      {
        this.alertify.error("You must be loggedIn as an Admin to access newletter generator!");
        this.router.navigate(['/']);
      }
      this.initializeFileUploader();
  }

  initializeFileUploader()
  {
    
      this.uploader = new FileUploader({
        url: this.baseUrl + '/property/add/photo/',
        authToken: 'Bearer ' + sessionStorage.getItem('accessToken'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: true,
        maxFileSize: this.maxAllowedFileSize

      });
    
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;

        setTimeout(()=>
          {
            window.location.reload();
          }, 15000);

      };

        this.uploader.onSuccessItem = (item, respose, status, headers) => {
          if (respose)
          {
            const photo = JSON.stringify(respose);
            const photo2 = JSON.parse(photo);
            //this.property.photos?.push(photo2);
          }
        }
  }

  publishNews()
  {
    if ((this.pname == null) && (this.desc == null) && (this.filename == null))
    {
      this.alertify.error("Fill all fields!");
    }
    else
    {
      console.log(this.pname);
      console.log(this.desc);
      //console.log(this.filename);
    }

    //stepts to follow:
    // 1. save the file (filename.value) to cloudinary
    // 2. save the data to database (create table and save all data) after getting the file cloudinary url from step 1
    // 3. send newsletter to all emails subscribed from db (get the emails from newsletter db)
  }
}
