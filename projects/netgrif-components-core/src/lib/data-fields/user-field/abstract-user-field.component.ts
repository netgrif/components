import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {UserField} from './models/user-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {UserValue} from './models/user-value';
import {UserListInjectedData} from '../../side-menu/content-components/user-assign/model/user-list-injected-data';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {TranslateService} from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
@Component({
    selector: 'ncc-abstract-user-field',
    template: ''
})
export abstract class AbstractUserFieldComponent extends AbstractDataFieldComponent implements OnInit {
    /**
     * Represents info about user from backend.
     */
    @Input() public dataField: UserField;
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
                          protected _translate: TranslateService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    /**
     * Call after click on user field button.
     *
     * Open [UserAssignDialogComponent]{@link UserAssignDialogComponent} in side menu with data represents preselected user from backend.
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
                    this._translate.instant('dataField.snackBar.userAssigned', {userName: this.dataField.value.fullName}),
                    'how_to_reg'
                );
                valueReturned = true;
            } else if (!valueReturned) {
                this._snackbar.openWarningSnackBar(this._translate.instant('dataField.snackBar.notSelectedUser'));
            }
        });
    }

    public hasHint(): boolean {
        return this.dataField.description !== undefined && this.dataField.description !== '';
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
