import {Component} from '@angular/core';
import {AbstractIframeCard} from '@netgrif/components-core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'nc-iframe-card',
    templateUrl: './iframe-card.component.html',
    styleUrls: ['./iframe-card.component.scss']
})
export class IframeCardComponent extends AbstractIframeCard {

    constructor(protected _sanitizer: DomSanitizer) {
        super(_sanitizer);
    }
}
