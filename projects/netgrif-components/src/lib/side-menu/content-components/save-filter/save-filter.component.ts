import {Component, Inject} from '@angular/core';
import {AbstractSaveFilterComponent} from '@netgrif/application-engine';
import {NAE_SIDE_MENU_CONTROL} from '@netgrif/application-engine';
import {SideMenuControl} from '@netgrif/application-engine';
import {UserFiltersService} from '@netgrif/application-engine';
import {SnackBarService} from '@netgrif/application-engine';
import {LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-save-filter',
    templateUrl: './save-filter.component.html',
    styleUrls: ['./save-filter.component.scss']
})
export class SaveFilterComponent extends AbstractSaveFilterComponent {

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) sideMenuControl: SideMenuControl,
                filterService: UserFiltersService,
                snackBar: SnackBarService,
                log: LoggerService) {
        super(sideMenuControl, filterService, snackBar, log);
    }

}
