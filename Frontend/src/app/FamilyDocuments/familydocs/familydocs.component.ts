/* eslint-disable no-prototype-builtins */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { map, pipe } from 'rxjs';
import { familydocuments } from 'src/app/model/familydocuments';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-familydocs',
  templateUrl: './familydocs.component.html',
  styleUrls: ['./familydocs.component.css']
})
export class FamilydocsComponent implements OnInit {

  constructor(private http: HttpClient) {}
  allPhotos: familydocuments[] = [];
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();
  uploader: FileUploader;
  baseUrl = environment.baseUrl;
  maxAllowedFileSize = 10*1024*1024;
  
  ngOnInit() {

    const httpOptions = {
                headers: new HttpHeaders({
               Authorization: 'Bearer ' + localStorage.getItem('token')
     })};

    const photos:any = [];
    this.http.get<{[key:string]: familydocuments}>(this.baseUrl + '/familydocuments/list/', httpOptions)
    
    .pipe(map((res) => {
      for(const key in res)
      {
        if(res.hasOwnProperty(key))
        {  
          photos.push({...res[key], id: key})
        }
      }
      return photos;
    }))
    .subscribe((photos) =>{
      console.log(photos);
      this.allPhotos = photos;
    });

    this.initializeFileUploader();
  }


  initializeFileUploader()
  {
    
      this.uploader = new FileUploader({
        url: this.baseUrl + '/familydocuments/add/photo/',
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
            this.allPhotos.push(photo);
          }
          window.location.reload();
          //this.router.navigate(["/property-detail/" + String(this.property.id)]);
      }
  }

  mainPhotoChanged(url: string)
  {
    this.mainPhotoChangedEvent.emit(url);
  }

}
