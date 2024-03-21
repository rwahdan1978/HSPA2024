/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, OnInit,Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { timer } from 'rxjs';
import { Photo } from 'src/app/model/photo';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit{

  token: any;

  ngOnInit(): void {

    this.token = localStorage.getItem("token");

    console.log(this.token.expired);

    timer(0, 600000).subscribe(() => { 

      const parseJwt = (this.token);        
      const decode = JSON.parse(atob(this.token.split('.')[1]));
      console.log(decode);
      if (decode.exp * 1000 < new Date().getTime()) 
      {
        localStorage.removeItem('token');
        localStorage.removeItem('chosenfolder');
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('userId');
        this.router.navigate(["user/login"]);
        this.alertify.error("Session Expired!")
      }
      
    });
      
      this.initializeFileUploader();
}

  @Input() property: Property;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();
  uploader: FileUploader;
  baseUrl = environment.baseUrl;
  maxAllowedFileSize = 10*1024*1024;

  constructor(private route: ActivatedRoute, private router: Router, 
    private housingService: HousingService, private alertify: AlertifyService) {
  }

  initializeFileUploader()
  {
    
      this.uploader = new FileUploader({
        url: this.baseUrl + '/property/add/photo/' + String(this.property.id),
        authToken: 'Bearer ' + localStorage.getItem('token'),
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
            this.property.photos?.push(photo2);
          }
        }
  }

  mainPhotoChanged(url: string)
  {
    this.mainPhotoChangedEvent.emit(url);
    window.location.reload();
  }

  setPrimaryPhoto(propertyId: number, photo: Photo)
  {
    this.housingService.setPrimaryPhoto(propertyId,photo.publicId).subscribe(()=> {
      this.mainPhotoChanged(photo.imageUrl);
      this.property.photos?.forEach(p => {
        if (p.isPrimary) {p.isPrimary = false;}
        if (p.publicId === photo.publicId) {p.isPrimary = true;}
      });
    });
   
  }

  deletePhoto(propertyId: number, photo: Photo)
  {
    this.housingService.deletePhoto(propertyId,photo.publicId).subscribe(()=> {
    this.property.photos = this.property.photos?.filter(p=> 
      p.publicId !== photo.publicId);
      //this.router.navigate(["/property-detail/" + String(this.property.id)]);
      window.location.reload();
    });
    
  }

}
