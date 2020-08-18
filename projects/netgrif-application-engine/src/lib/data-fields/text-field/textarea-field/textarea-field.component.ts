import {AfterViewInit, Component, ElementRef, Input, NgZone, ViewChild} from '@angular/core';
import {TextAreaHeight, TextField} from '../models/text-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';
import {AbstractTextFieldComponent} from '../abstract-text-field.component';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
    selector: 'nae-textarea-field',
    templateUrl: './textarea-field.component.html',
    styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends AbstractTextFieldComponent implements AfterViewInit {

    @Input() textAreaField: TextField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
    @ViewChild('dynamicTextArea') dynamicTextArea: CdkTextareaAutosize;
    @ViewChild('textArea') textArea: ElementRef<HTMLTextAreaElement>;

    constructor(protected _translate: TranslateService, private _ngZone: NgZone) {
        super(_translate);
    }

    ngAfterViewInit() {
        this.triggerResize();
        this.textArea.nativeElement.style.minHeight = this.getHeight() + 'px';
        if (parseInt(this.textArea.nativeElement.style.height, 10) < this.getHeight()) {
            this.textArea.nativeElement.style.height = this.getHeight() + 'px';
        }
    }

    public getHeight() {
        const oneHeight = this.textAreaField.layout && this.textAreaField.layout.appearance === 'outline' ?
            TextAreaHeight.OUTLINE : TextAreaHeight.FILL_STANDARD;
        return this.textAreaField.layout && this.textAreaField.layout.rows && this.textAreaField.layout.rows !== 1 ?
            (this.textAreaField.layout.rows - 1) * TextField.FIELD_HEIGHT + oneHeight : oneHeight;
    }

    triggerResize() {
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.dynamicTextArea.resizeToFitContent(true));
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.textAreaField, this.formControlRef);
    }
}
