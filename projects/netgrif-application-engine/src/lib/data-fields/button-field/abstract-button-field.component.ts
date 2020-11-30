import {Inject, Input, Optional} from '@angular/core';
import {ButtonField, ButtonFieldValidation} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DialogService} from '../../dialog/services/dialog.service';

export abstract class AbstractButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: ButtonField;

    protected constructor(protected _translate: TranslateService,
                          protected dialogService: DialogService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    public getErrorMessage() {
        if (this.formControl.hasError(ButtonFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
    }

    public resolveComponentType() {
        if (this.dataField.component !== undefined) {
            return this.dataField.component.name;
        }
        return this.dataField.view;
    }

    public resolveValue() {
        if (this.dataField.component && this.dataField.component.properties &&
            this.dataField.component.properties.dialogText !== undefined) {
            const dialogRef = this.dialogService.openConfirmDialog(this.dataField.component.properties.dialogTitle,
                this.dataField.component.properties.dialogText, this._translate.instant('dialog.close'),
                this._translate.instant('dialog.submit'));
            dialogRef.afterClosed().subscribe(result => {
                if (result && result.confirmed) {
                    this.formControl.setValue(this.formControl.value + 1);
                }
            });
        } else {
            this.formControl.setValue(this.formControl.value + 1);
        }
    }
}
