import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractHtmlTextareaFieldComponent} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'nc-html-textarea-field',
    templateUrl: './html-textarea-field.component.html',
    styleUrls: ['./html-textarea-field.component.scss']
})
export class HtmlTextareaFieldComponent extends AbstractHtmlTextareaFieldComponent implements OnInit, AfterViewInit {
    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer) {
        super(_translate, _sanitizer);
    }

    ngAfterViewInit(): void {
        if(!this.textAreaField?.placeholder) {
            this.textAreaField.placeholder = this._translate.instant('dataField.textarea.insertText');
        }
    }
}
