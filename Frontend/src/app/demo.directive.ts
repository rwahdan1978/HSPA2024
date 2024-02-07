import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDemo]'
})
export class DemoDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  imageChange(){
    var src:any = this.el.nativeElement.src;
    var prev:any = document.getElementById("mypreview");
    prev.src = src;
    var imageSlide = document.getElementsByClassName("img-slide");
    for (let i = 0; i < imageSlide.length; i++){
      imageSlide[i].classList.remove("activate");
    }
    this.el.nativeElement.parentElement.classList.add("activate");
  }
}
