import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from '../../environments/environment';
import { Ikeyvaluepair } from '../model/ikeyvaluepair';
import { UserLoginComponent } from '../user/user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class HousingService 
{
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllCities(): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "/city/cities");
  }

  getPropertyTypes(): Observable<Ikeyvaluepair[]>{
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + "/propertytype/list");
  }

  getFurnishingTypes(): Observable<Ikeyvaluepair[]>{
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + "/furnishingtype/list");
  }

  getProperty(id: number)
  {
    return this.http.get<Property>(this.baseUrl + '/property/detail/' + id.toString());
  }

  getAllProperties(SellRent?: number): Observable<Property[]>
  {
    return this.http.get<Property[]>(this.baseUrl + '/property/list/' +SellRent.toString());
  }

  getAllProperties1(): Observable<Property[]>
  {
    return this.http.get<Property[]>(this.baseUrl + '/property/list/');
  }
    
  addProperty(property: Property) 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl + "/property/add", property, httpOptions);
  }

  // getNewToken()
  // {
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + sessionStorage.getItem("token")
  //   })
  // };

  // return this.http.post(this.baseUrl + "/account/refreshtoken/", httpOptions);
  // }

  addFolder(folder: string) 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl + "/familydocuments/createfolders/" + folder, null,httpOptions);
  }

  newPropID()
  {
    if (sessionStorage.getItem('PID'))
      {
        sessionStorage.setItem('PID', String(+sessionStorage.getItem('PID') + 1));
        return +sessionStorage.getItem('PID');
      }
      else
      {
        sessionStorage.setItem('PID', '101');
        return 101;
      }
  }

  getPropertyAge(dateofEstablishment: string): string
  {
        const today = new Date();
        const estDate = new Date(dateofEstablishment);
        let age = today.getFullYear() - estDate.getFullYear();
        const m = today.getMonth() - estDate.getMonth();

        // Current month smaller than establishment month or
        // Same month but current date smaller than establishment date
        if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
            age --;
        }

        // Establshment date is future date
        if(today < estDate) {
            return 'property is not available yet';
        }

        // Age is less than a year
        if(age === 0) {
            return 'Less than a year';
        }

        return age.toString();
  }

  setPrimaryPhoto(propertyId:number, propertyPhotoId: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    return this.http.post(this.baseUrl + '/property/set-primary-photo/' + String(propertyId) + '/' + propertyPhotoId, {}, httpOptions)
  }

  deletePhoto(propertyId:number, propertyPhotoId: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    return this.http.delete(this.baseUrl + '/property/delete-photo/' + String(propertyId) + '/' + propertyPhotoId, httpOptions)
  }

  deleteFamilyPhoto(imageId: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    
    return this.http.delete(this.baseUrl + '/familydocuments/delete-photo/' + imageId, httpOptions)
  }

  deleteProperty(id: number)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    return this.http.delete(this.baseUrl + '/property/delete/' + id, httpOptions)
  }

  listFamilyFolders()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };

    return this.http.get(this.baseUrl + '/familydocuments/folders', httpOptions);
  }
  // listFamilyPhoto()
  // {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + sessionStorage.getItem('token')
  //     })
  //   };

  //   return this.http.get(this.baseUrl + '/familydocuments/list/', httpOptions)
  // }

}