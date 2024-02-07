import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(private http: HttpClient) { }

imageUpload(imageForm: FormData) {
  console.log('image uploading');
  return this.http.post('https://nodejsapi-30tm.onrender.com/api/v1/upload/', imageForm);
 }
}
