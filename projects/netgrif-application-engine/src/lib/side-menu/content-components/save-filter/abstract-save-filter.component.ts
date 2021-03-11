import {UserFiltersService} from '../../../filter/user-filters.service';
import {FormControl} from '@angular/forms';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {SaveFilterInjectionData} from './model/save-filter-injection-data';
import {LoggerService} from '../../../logger/services/logger.service';

export abstract class AbstractSaveFilterComponent {

    public titleFormControl: FormControl;
    public descriptionFormControl: FormControl;

    protected _injectedData: SaveFilterInjectionData;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          protected _filterService: UserFiltersService,
                          protected _snackBar: SnackBarService,
                          protected _log: LoggerService) {
        if (this._sideMenuControl.data) {
            this._injectedData = this._sideMenuControl.data as SaveFilterInjectionData;
        }

        this.titleFormControl = new FormControl();
        this.descriptionFormControl = new FormControl();
    }

    public save() {
        this._filterService.save(this._injectedData.filter, this._injectedData.searchMetadata,
            this.titleFormControl.value, this.descriptionFormControl.value)
            .subscribe(success => {
                if (success) {
                    // TODO i18n
                    this._snackBar.openSuccessSnackBar('Filter saved successfully');
                } else {
                    this.showErrorSnackBar();
                }
            }, error => {
                this._log.error('Filter save failed', error);
                this.showErrorSnackBar();
            });
    }

    protected showErrorSnackBar() {
        // TODO i18n
        this._snackBar.openErrorSnackBar('Filter could not be saved');
    }
}
