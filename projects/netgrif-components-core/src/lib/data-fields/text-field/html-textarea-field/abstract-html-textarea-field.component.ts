import {Component, Inject, inject, NgZone, OnInit, Optional, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {TextAreaField} from '../models/text-area-field';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";

@Component({
    selector: 'ncc-abstract-html-area-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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

    /**
     * Value getter of `<quill-editor [valueGetter]>`: the semantic HTML of Quill 2 (`getSemanticHTML()`, lists as
     * `<ul>` / `<ol>`, the same as the HTML of Quill 1), with the spaces as they are - `getSemanticHTML()` writes every
     * space as `&nbsp;`, which changed the stored data, fulltext search and exports. The editor HTML of Quill 2 is not
     * stored: its lists are `<ol><li data-list="bullet">` with its own `ql-ui` elements, shown as numbered lists outside
     * the editor. An empty editor is stored as `null`.
     * @param editor Quill instance
     */
    public quillValueGetter = (editor: { root: HTMLElement, getSemanticHTML?: () => string }): string | null => {
        const html = typeof editor.getSemanticHTML === 'function'
            ? editor.getSemanticHTML().replace(/&nbsp;/g, ' ')
            : editor.root.innerHTML;
        return AbstractHtmlTextareaFieldComponent.EMPTY_VALUES.includes(html) ? null : html;
    };

    protected readonly _ngZone = inject(NgZone);

    /**
     * Stores the value of the editor (`<quill-editor (ngModelChange)>`). ngx-quill emits the changes outside
     * of the Angular zone, so the value is set inside it, otherwise bindings to the value (validity, other fields)
     * would not be updated.
     * @param value HTML from {@link quillValueGetter}
     */
    public setQuillValue(value: string | null): void {
        this._ngZone.run(() => this.dataField.value = value);
    }

    private static readonly EMPTY_VALUES = ['<p></p>', '<div></div>', '<p><br></p>', '<div><br></div>'];

    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, dataFieldPortalData);
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
