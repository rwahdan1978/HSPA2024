import { Component } from '@angular/core';
import { UploadService } from './upload.service';
import {GetVariableService} from '../property/getVariable.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {

  //variables
  imageObj: any;
  imageUrl: string;
  thedata: string;
  theFlag: boolean = false;

   constructor(private imageUploadService: UploadService, 
               private variable:GetVariableService,
               private http: HttpClient) {}

   onImagePicked1(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;

    this.variable.theFileName1 = this.imageObj["name"];
    // this.http.post("http://localhost:3000/api/v1/upload/",this.data).subscribe();

   }

   onImagePicked2(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;

    this.variable.theFileName2 = this.imageObj["name"];

   }

   onImagePicked3(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;

    this.variable.theFileName3 = this.imageObj["name"];

   }

   onImagePicked4(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;

    this.variable.theFileName4 = this.imageObj["name"];

   }

   onImagePicked5(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;

    this.variable.theFileName5 = this.imageObj["name"];

   }

   onImagePicked6(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
    this.variable.theFileName6 = this.imageObj["name"];

   }

   
   onImageUpload1() {

    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.imageUrl = res['image'];
    });

    let theinput1 = document.getElementById("input1");
    theinput1?.setAttribute("disabled","true");
    let thebutton1 = document.getElementById("button1");
    thebutton1?.setAttribute("disabled","true");

    let theinput2 = document.getElementById("input2");
    theinput2?.removeAttribute("disabled");
    let thebutton2 = document.getElementById("button2");
    thebutton2?.removeAttribute("disabled");

   }

   onImageUpload2() {

    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.imageUrl = res['image'];
    });

    let theinput2_2 = document.getElementById("input2");
    theinput2_2?.setAttribute("disabled","true");
    let thebutton2_2 = document.getElementById("button2");
    thebutton2_2?.setAttribute("disabled","true");

    let theinput3 = document.getElementById("input3");
    theinput3?.removeAttribute("disabled");
    let thebutton3 = document.getElementById("button3");
    thebutton3?.removeAttribute("disabled");

   }

   onImageUpload3() {

    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.imageUrl = res['image'];
    });

    let theinput3_3 = document.getElementById("input3");
    theinput3_3?.setAttribute("disabled","true");
    let thebutton3_3 = document.getElementById("button3");
    thebutton3_3?.setAttribute("disabled","true");

    let theinput4 = document.getElementById("input4");
    theinput4?.removeAttribute("disabled");
    let thebutton4 = document.getElementById("button4");
    thebutton4?.removeAttribute("disabled");

   }

   onImageUpload4() {

    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.imageUrl = res['image'];
    });

    let theinput4_4 = document.getElementById("input4");
    theinput4_4?.setAttribute("disabled","true");
    let thebutton4_4 = document.getElementById("button4");
    thebutton4_4?.setAttribute("disabled","true");

    let theinput5 = document.getElementById("input5");
    theinput5?.removeAttribute("disabled");
    let thebutton5 = document.getElementById("button5");
    thebutton5?.removeAttribute("disabled");

   }

   onImageUpload5() {

    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.imageUrl = res['image'];
    });

    let theinput5_5 = document.getElementById("input5");
    theinput5_5?.setAttribute("disabled","true");
    let thebutton5_5 = document.getElementById("button5");
    thebutton5_5?.setAttribute("disabled","true");

    let theinput6 = document.getElementById("input6");
    theinput6?.removeAttribute("disabled");
    let thebutton6 = document.getElementById("button6");
    thebutton6?.removeAttribute("disabled");

   }

   onImageUpload6() {

    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.imageUrl = res['image'];
    });

    let theinput6_6 = document.getElementById("input6");
    theinput6_6?.setAttribute("disabled","true");
    let thebutton6_6 = document.getElementById("button6");
    thebutton6_6?.setAttribute("disabled","true");

    this.theFlag = true;

   }
}