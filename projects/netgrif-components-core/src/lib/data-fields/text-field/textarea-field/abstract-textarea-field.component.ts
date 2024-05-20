import {AfterViewInit, Component, Inject, Optional} from '@angular/core';
import {ElementRef, NgZone, ViewChild} from '@angular/core';
import {TextAreaHeight, TextField} from '../models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {TextAreaField} from "../models/text-area-field";
import {NAE_SAVE_DATA_INFORM} from "../../models/save-data-inform-token";

@Component({
    selector: 'ncc-abstract-text-area-field',
    template: ''
})
export abstract class AbstractTextareaFieldComponent extends AbstractTextErrorsComponent<TextField> implements AfterViewInit {

    @ViewChild('dynamicTextArea') dynamicTextArea: CdkTextareaAutosize;
    @ViewChild('textArea') textArea: ElementRef<HTMLTextAreaElement>;

    constructor(protected _translate: TranslateService, protected _ngZone: NgZone,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        super(_translate, dataFieldPortalData, _saveDataInform);
    }

    ngAfterViewInit() {
        this.triggerResize();
        this.textArea.nativeElement.style.minHeight = this.getHeight() + 'px';
        if (parseInt(this.textArea.nativeElement.style.height, 10) < this.getHeight()) {
            this.textArea.nativeElement.style.height = this.getHeight() + 'px';
        }
    }

    public getHeight() {
        const oneHeight = this.dataField.layout && this.dataField.layout.appearance === 'outline' ?
            TextAreaHeight.OUTLINE : TextAreaHeight.FILL_STANDARD;
        return this.dataField.layout?.rows && this.dataField.layout?.rows !== 1 ?
            (this.dataField.layout.rows - 1) * TextField.FIELD_HEIGHT + oneHeight : oneHeight;
    }

    triggerResize() {
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.dynamicTextArea.resizeToFitContent(true));
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.dataField, this.formControlRef);
    }
}
