import {TestBed} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';
import {SafeHtmlPipe} from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
    it('should create an instance', () => {
        const sanitizer = TestBed.inject(DomSanitizer);
        const pipe = new SafeHtmlPipe(sanitizer);
        expect(pipe).toBeTruthy();
    });

    it('should transform html string to safe html', () => {
        const sanitizer = TestBed.inject(DomSanitizer);
        const pipe = new SafeHtmlPipe(sanitizer);
        const result = pipe.transform('<b>test</b>');
        expect(result).toBeTruthy();
    });
});
