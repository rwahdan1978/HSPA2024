/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { familydocuments } from 'src/app/model/familydocuments';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-familydocs',
  templateUrl: './familydocs.component.html',
  styleUrls: ['./familydocs.component.css']
})
export class FamilydocsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  baseUrl = environment.baseUrl;
  ngOnInit() {

    const test = this.http.get<familydocuments>(this.baseUrl + '/familydocuments/list/').subscribe((res) =>{
      console.log(res);
    });
    return test;
  }

}
