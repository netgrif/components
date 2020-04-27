import {Component, Input, OnInit} from '@angular/core';
import {IframeCard} from '../model/iframe-card';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'nae-iframe-card',
    templateUrl: './iframe-card.component.html',
    styleUrls: ['./iframe-card.component.scss']
})
export class IframeCardComponent implements OnInit {

    @Input() public card: IframeCard;
    public sanitizedURL: SafeResourceUrl;

    constructor(private _sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        // TODO SECURITY 11.4.2020 - better sanitization
        this.sanitizedURL =  this._sanitizer.bypassSecurityTrustResourceUrl(this.card.url);
    }

}
