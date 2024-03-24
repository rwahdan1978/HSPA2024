/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-else-if */
import { Component, HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{

  // @HostListener('window:beforeunload', ['$event'])
  //   public beforeunloadHandler($event:any) {
  //     sessionStorage.removeItem('userName');
  //     sessionStorage.removeItem('token');
  // }

  title = 'my-first-app';

  token = sessionStorage.getItem("token");
 
   minute = 10;
   seconds = this.minute * 60;
   textSec = "0";
   statSec = 60;
   display:any;
   
  prefix = this.minute < 10 ? "0" : "";

  timer = setInterval(() => {

  this.seconds--;
  if (this.statSec != 0) this.statSec--;
  else this.statSec = 59;

  if (this.statSec < 10) {
    this.textSec = "0" + this.statSec;
  } else this.textSec = this.statSec.toString();

  this.display = `${this.prefix}${Math.floor(this.seconds / 60)}:${this.textSec}`;

  if (this.seconds == 0) {
    console.log("finished");
    clearInterval(this.timer);
  }
  }, 1000);
}