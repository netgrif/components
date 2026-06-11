import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'img[nabFlagFallback]',
})
export class FlagFallbackDirective {

  constructor(private eRef: ElementRef) {
  }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = this.eRef.nativeElement;
    element.src = 'assets/flags/xx.svg';
  }
}
