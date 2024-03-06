/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, OnInit,Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
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

  ngOnInit(): void {
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
      };

        this.uploader.onSuccessItem = (item,respose,status, header) => 
        {
          if (respose)
          {
            const photo = JSON.parse(respose);
            this.property.photos?.push(photo);
          }
          window.location.reload();
          //this.router.navigate(["/property-detail/" + String(this.property.id)]);
        }
  }

  mainPhotoChanged(url: string)
  {
    this.mainPhotoChangedEvent.emit(url);
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
