import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(private http: HttpClient) { }

imageUpload(imageForm: FormData) {
  console.log('image uploading');
  return this.http.post('https://angular-upload-files-2023-2024.s3.amazonaws.com/api/v1/upload/', imageForm);
 }
}
