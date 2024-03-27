/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-else-if */
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{

  minute = 8;
  seconds = this.minute * 60;
  textSec = "0";
  statSec = 60;
  display:any;
  token:any;
  prefix:any;
  timer:any;
  context:any;


  // @HostListener('window:beforeunload')
  //  beforeUnloadHandler() {
  //   localStorage.setItem("timer","2");
  //   return false;
  //  }

  title = 'my-first-app'; 

  ngOnInit() {

    this.token = sessionStorage.getItem("token");
  
    this.prefix = this.minute < 10 ? "0" : "";
  
    if (this.token != null)
    {
      this.timer = setInterval(() => {
    
        this.seconds--;
        if (this.statSec != 0) this.statSec--;
        else this.statSec = 59;
      
        if (this.statSec < 10) {
          this.textSec = "0" + this.statSec;
        } else this.textSec = this.statSec.toString();
      
        this.display = `${this.prefix}${Math.floor(this.seconds / 60)}:${this.textSec}`;

        // if (this.display != localStorage.getItem("display"))
        // {
        //   this.display = localStorage.getItem("display")
        // }

        localStorage.setItem("display", this.display);
      
        if (this.seconds == 0) {
          console.log("finished");
          clearInterval(this.timer);
        }
        }, 1000);
    }

  }
}