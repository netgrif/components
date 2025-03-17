import {Component} from '@angular/core';
import {AbstractIframeCardComponent} from '@netgrif/components-core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'nc-iframe-card',
    templateUrl: './iframe-card.component.html',
    styleUrls: ['./iframe-card.component.scss'],
    standalone: false
})
export class IframeCardComponent extends AbstractIframeCardComponent {

    constructor(protected _sanitizer: DomSanitizer) {
        super(_sanitizer);
    }
}
