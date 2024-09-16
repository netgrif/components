import {Component, Inject, Optional} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ButtonField, ButtonFieldValidation} from "../models/button-field";
import {take} from "rxjs/operators";
import {DialogService} from "../../../dialog/services/dialog.service";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";


@Component({
    selector: 'ncc-abstract-button-default-field',
    template: ''
})
export abstract class AbstractButtonDefaultFieldComponent extends AbstractBaseDataFieldComponent<ButtonField> {

    constructor(_translate: TranslateService,
                protected _dialogService: DialogService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<ButtonField>) {
        super(_translate, dataFieldPortalData);
    }

    public getErrorMessage() {
        if (this.formControlRef.hasError(ButtonFieldValidation.REQUIRED)) {
            return this.translate.instant('dataField.validations.required');
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
        if (!!this.dataField.component?.properties?.dialogText && this.dataField.component?.properties?.dialogTitle) {
            const dialogRef = this._dialogService.openConfirmDialog(this.dataField.component.properties.dialogTitle,
                this.dataField.component.properties.dialogText, this.translate.instant('dialog.close'),
                this.translate.instant('dialog.submit'));
            dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
                if (result?.confirmed) {
                    this.formControlRef.setValue(this.formControlRef.value + 1);
                }
            });
        } else {
            this.formControlRef.setValue(this.formControlRef.value + 1);
        }
    }
}
