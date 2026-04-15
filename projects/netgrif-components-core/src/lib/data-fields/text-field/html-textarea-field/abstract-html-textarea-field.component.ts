import {Component, Inject, OnInit, Optional, SecurityContext} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextAreaField} from '../models/text-area-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from '../../models/data-field-portal-data-injection-token';
import {DomSanitizer, } from '@angular/platform-browser';

@Component({
    selector: 'ncc-abstract-html-area-field',
    template: ''
})
export abstract class AbstractHtmlTextareaFieldComponent extends AbstractTextErrorsComponent<TextAreaField> implements OnInit {

    public quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{list: 'ordered'}, {list: 'bullet'}],      // ordered/unordered list
            [{script: 'sub'}, {script: 'super'}],      // superscript/subscript
            [{indent: '-1'}, {indent: '+1'}],          // outdent/indent

            [{header: [1, 2, 3, 4, 5, 6, false]}],

            [{color: []}, {background: []}],          // dropdown with defaults from theme
            [{font: []}],
            [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],     // alignment buttons

            ['clean'],                                         // remove formatting button

            ['link', 'image', 'video']                         // link and image, video
        ]
    };

    public disabledDisplay = '';

    constructor(
        protected _translate: TranslateService,
        protected _sanitizer: DomSanitizer,
        @Optional() @Inject(DATA_FIELD_PORTAL_DATA)
        dataFieldPortalData: DataFieldPortalData<TextAreaField>
    ) {
        super(_translate, dataFieldPortalData);
    }

    ngOnInit(): void {
        this.updateDisabledDisplay();

        this.dataField.valueChanges().subscribe(() => {
            this.updateDisabledDisplay();
        });
    }

    protected updateDisabledDisplay(): void {
        const value = this.dataField.value ?? '';
        this.disabledDisplay =
            this._sanitizer.sanitize(SecurityContext.HTML, value) ?? '';
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.dataField, this.formControlRef);
    }
}
