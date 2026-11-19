import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractImportNetComponent,
    LoggerService,
    NAE_SIDE_MENU_CONTROL,
    PetriNetResourceService,
    SideMenuControl,
    SnackBarService,
    UriService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-import-net',
    templateUrl: './import-net.component.html',
    styleUrls: ['./import-net.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ImportNetComponent extends AbstractImportNetComponent {

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _petriNetResource: PetriNetResourceService,
                protected _uriService: UriService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        super(_sideMenuControl, _petriNetResource, _uriService, _log, _snackbar, _translate);
    }
}
