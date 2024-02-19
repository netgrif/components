import {Component, Inject, Optional} from "@angular/core";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {UserListInjectedData} from "../../../side-menu/content-components/user-assign/model/user-list-injected-data";
import {UserValue} from "../models/user-value";
import {UserField} from "../models/user-field";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {MatDialog} from '@angular/material/dialog';
import {ValidationRegistryService} from "../../../registry/validation-registry.service";

@Component({
    selector: 'ncc-abstract-user-default-field',
    template: ''
})
export abstract class AbstractUserDefaultFieldComponent extends AbstractBaseDataFieldComponent<UserField>{

    private labelWidth: number;
    public cutProperty: string;

    /**
     * Inject services.
     * @param _dialog Service to open and close [UserAssignDialogComponent]{@link UserAssignDialogComponent} with user data.
     * @param _snackbar Service to displaying information to the user.
     * @param _translate Service to translate text.
     * @param informAboutInvalidData whether the backend should be notified about invalid values.
     * Option injected trough `NAE_INFORM_ABOUT_INVALID_DATA` InjectionToken
     */
    protected constructor(protected _dialog: MatDialog,
                          protected _snackbar: SnackBarService,
                          _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserField>,
                          _validationRegistryService: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistryService);
    }

    /**
     * Call after click on user field button.
     *
     * Open [UserAssignComponent]{@link AbstractUserAssignComponent} in side menu with data represents preselected user from backend.
     *
     * After close side menu, the snackbar info will be displayed either for the unselected user or the selected one.
     */
    public selectAbstractUser(component) {
        let valueReturned = false;
        const dialogRef = this._dialog.open(component, {
            panelClass: "dialog-responsive",
            data: {roles: this.dataField.roles, value: this.dataField.value} as UserListInjectedData,
        });
        dialogRef.afterClosed().subscribe($event => {
            if ($event.data) {
                this.dataField.value = $event.data as UserValue;
                this._snackbar.openGenericSnackBar(
                    this.translate.instant('dataField.snackBar.userAssigned', {userName: this.dataField.value.fullName}),
                    'how_to_reg'
                );
                valueReturned = true;
            } else if (!valueReturned) {
                this._snackbar.openWarningSnackBar(this.translate.instant('dataField.snackBar.notSelectedUser'));
            }
        });
    }

    public deleteUser() {
        this.dataField.value = undefined;
    }

    public getCutProperty(i18nLabel): string {
        if (this.labelWidth !== i18nLabel.offsetWidth) {
            this.labelWidth = i18nLabel.offsetWidth;
            const calculatedWidth = 'calc(0.5em + ' + i18nLabel.offsetWidth / 4 * 3 + 'px)';
            this.cutProperty = `polygon(0 0, 0 100%, 100% 100%, 100% 0%, ${calculatedWidth} 0, ${calculatedWidth} 6%, 0.5em 6%, 0.5em 0)`;
        }
        return this.cutProperty;
    }

}
