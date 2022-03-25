import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextAreaField} from '../models/text-area-field';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
    selector: 'ncc-abstract-html-area-field',
    template: ''
})
export abstract class AbstractHtmlTextareaFieldComponent extends AbstractTextErrorsComponent implements OnInit {

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

    @Input() textAreaField: TextAreaField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer) {
        super(_translate);
    }

    ngOnInit(): void {
        this.disabledDisplay = this._sanitizer.bypassSecurityTrustHtml(this.textAreaField.value);
        this.textAreaField.valueChanges().subscribe(() => {
            this.disabledDisplay = this._sanitizer.bypassSecurityTrustHtml(this.textAreaField.value);
        });
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textAreaField, this.formControlRef);
    }
}
