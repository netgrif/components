import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {IframeCard} from '../model/iframe-card';

@Component({
    selector: 'ncc-abstract-iframe-card',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
