import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {IframeCard} from '../model/iframe-card';

@Component({
    selector: 'ncc-abstract-iframe-card',
    template: ''
})
export abstract class AbstractIframeCardComponent implements OnInit {

    @Input() public card: IframeCard;
    public sanitizedURL: SafeResourceUrl;

    constructor(protected _sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        // TODO SECURITY 11.4.2020 - better sanitization
        this.sanitizedURL =  this._sanitizer.bypassSecurityTrustResourceUrl(this.card.url);
    }
}
