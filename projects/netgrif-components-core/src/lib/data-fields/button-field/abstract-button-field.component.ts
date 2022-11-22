import {Component, Inject, Input, Optional} from '@angular/core';
import {ButtonField, ButtonFieldValidation} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DialogService} from '../../dialog/services/dialog.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'ncc-abstract-button-field',
    template: ''
})
export abstract class AbstractButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: ButtonField;

    protected constructor(protected _translate: TranslateService,
                          protected _dialogService: DialogService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    public getErrorMessage() {
        if (this.formControl.hasError(ButtonFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
    }

    /**
     * Function checks if button is icon type
     * @returns true if component type is 'fab', 'minifab' or 'icon'
     */
    public isIconTypeButton(): boolean {
        return this.dataField.getComponentType() === 'fab' || this.dataField.getComponentType() === 'minifab' || this.dataField.getComponentType() === 'icon';
    }

    /**
     * This function depends on type of component, if had dialogText provided in component, then its open a dialog with that text
     */
    public resolveValue(): void {
        if (this.dataField.component && this.dataField.component.properties &&
            this.dataField.component.properties.dialogText !== undefined) {
            const dialogRef = this._dialogService.openConfirmDialog(this.dataField.component.properties.dialogTitle,
                this.dataField.component.properties.dialogText, this._translate.instant('dialog.close'),
                this._translate.instant('dialog.submit'));
            dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
                if (result && result.confirmed) {
                    this.formControl.setValue(this.formControl.value + 1);
                }
            });
        } else {
            this.formControl.setValue(this.formControl.value + 1);
        }
    }
}
