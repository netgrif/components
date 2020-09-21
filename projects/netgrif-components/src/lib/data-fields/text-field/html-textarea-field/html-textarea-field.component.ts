import {Component, OnInit} from '@angular/core';
import {AbstractHtmlTextareaFieldComponent} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'nc-html-textarea-field',
    templateUrl: './html-textarea-field.component.html',
    styleUrls: ['./html-textarea-field.component.scss']
})
export class HtmlTextareaFieldComponent extends AbstractHtmlTextareaFieldComponent implements OnInit {
    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer) {
        super(_translate, _sanitizer);
    }
}
