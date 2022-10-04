import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, ViewChild} from '@angular/core';
import EasyMDE from 'easymde';
import * as marked from 'marked';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TextAreaField} from '@netgrif/components-core';

const noop: any = () => {
};

@Component({
    selector: 'nc-easymde-wrapper',
    template: '<textarea #easymde></textarea>',
    styleUrls: ['./easymde-wrapper.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EasymdeWrapperComponent),
            multi: true,
        },
    ],
})
export class EasymdeWrapperComponent implements OnDestroy, AfterViewInit, ControlValueAccessor {
    private _easyMDE!: EasyMDE;
    private _fromEditor = false;
    public options: any;
    @Input() formControlRef: FormControl;
    @Input() textAreaField: TextAreaField;
    @ViewChild('easymde', {static: true}) textarea!: ElementRef;

    constructor() {
        this.options = {
            autoDownloadFontAwesome: true,
            minHeight: '95px',
            spellChecker: false,
            toolbar: ['bold', 'italic', 'heading', 'strikethrough', '|', 'code', 'quote', 'unordered-list', 'ordered-list', '|',
                'link', 'image', 'table', '|', 'horizontal-rule', 'preview', '|', 'guide'],
            shortcuts: {
                toggleSideBySide: null,
                toggleFullScreen: null
            }
        };
    }

    // eslint-disable-next-line no-unused-vars
    propagateChange = (_: any) => noop;
    onTouched = () => noop;

    writeValue(value: any): void {
        this.textAreaField.value = !value ? '' : value;
    }
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngAfterViewInit(): void {
        this.options.element = this.textarea.nativeElement;
        marked.marked.setOptions({sanitize: true});
        this._easyMDE = new EasyMDE(this.options);
        this._easyMDE.value(this.textAreaField.value);
        this._easyMDE.codemirror.on('change', this._onChange);
    }

    private _onChange = (): void => {
        this._fromEditor = true;
        this.writeValue(this._easyMDE?.value());
    };

    ngOnDestroy(): void {
        this._easyMDE?.codemirror.off('change', this._onChange);
    }
}
