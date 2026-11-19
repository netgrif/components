import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
    standalone: false,
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {
  }

  public transform(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
