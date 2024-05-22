import {Component, Inject, OnInit, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextAreaField} from '../models/text-area-field';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {NAE_SAVE_DATA_INFORM} from "../../models/save-data-inform-token";

@Component({
    selector: 'ncc-abstract-html-area-field',
    template: ''
})
export abstract class AbstractHtmlTextareaFieldComponent extends AbstractTextErrorsComponent<TextAreaField> implements OnInit {

    public quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ list: 'ordered'}, { list: 'bullet' }],      // ordered/unordered list
            [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
            [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent

            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],     // alignment buttons

            ['clean'],                                         // remove formatting button

            ['link', 'image', 'video']                         // link and image, video
        ]
    };

    public disabledDisplay: SafeHtml;

    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean) {
        super(_translate, dataFieldPortalData, _saveDataInform);
    }

    ngOnInit(): void {
        this.disabledDisplay = this.sanitizeValue();
        this.dataField.valueChanges().subscribe(() => {
            this.disabledDisplay = this.sanitizeValue();
        });
    }

    protected sanitizeValue(): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(this.dataField.value !== undefined ? this.dataField.value : '');
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.dataField, this.formControlRef);
    }
}
