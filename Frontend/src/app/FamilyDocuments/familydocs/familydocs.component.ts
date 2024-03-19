/* eslint-disable no-prototype-builtins */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { map, pipe } from 'rxjs';
import { familydocuments } from 'src/app/model/familydocuments';
import { HousingService } from 'src/app/services/housing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-familydocs',
  templateUrl: './familydocs.component.html',
  styleUrls: ['./familydocs.component.css']
})
export class FamilydocsComponent implements OnInit {

  constructor(private http: HttpClient, private housingService: HousingService,
    private route: ActivatedRoute, private router: Router) {}

  allPhotos: familydocuments[] = [];
  @Input() familyDocs: familydocuments[] = [];
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();
  uploader: FileUploader;
  baseUrl = environment.baseUrl;
  maxAllowedFileSize = 10*1024*1024;
  ApiKey = environment.ApiKey;
  ApiSecret = environment.ApiSecret;
  test:any;
  public test2:any;
  values:any;
  foldersName:any;
  foldersPath:any;
  thefolder:any;
  
  ngOnInit() {

    this.housingService.listFamilyFolders().subscribe(data => {
      this.test = JSON.stringify(data,["folders","name","path"]);
      const test2 = JSON.parse(this.test);
      console.log(test2);

      this.thefolder = localStorage.removeItem("chosenfolder");

        this.foldersName = Object.keys(test2.folders)
        .map(function (index) {
            return test2.folders[index].name;
        });

        this.foldersPath = Object.keys(test2.folders)
        .map(function (index) {
            return test2.folders[index].path;
        });
    });

  }

  testIt(item:any){
    // here we will check all photos in family photos that belongs to the item and show them.
    console.log(item);
    localStorage.setItem('chosenfolder', item);
    this.thefolder = localStorage.getItem("chosenfolder");
    const httpOptions = {
      headers: new HttpHeaders({
     Authorization: 'Bearer ' + localStorage.getItem('token')
    })};

    const photos:any[] = [];
    this.http.get<{[key:string]: familydocuments}>(this.baseUrl + '/familydocuments/listwithfoldername/'
                                                                + this.thefolder, httpOptions)

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
  }

  initializeFileUploader()
  {
      this.uploader = new FileUploader({
        url: this.baseUrl + '/familydocuments/add/photo/',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
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
              const photo = JSON.stringify(respose);
              const photos = JSON.parse(photo);
              this.allPhotos.push(photos);
          }

          setTimeout(()=>
        {
          window.location.reload();
          //this.router.navigate(["familydocuments"])
        }, 15000);
      };
  }

  deletePhoto(imageId: string)
  {
    this.housingService.deleteFamilyPhoto(imageId).subscribe();

      setTimeout(() =>
        {
          window.location.reload();
          this.router.navigate(["familydocuments"])
        }, 1000);
  }
}
