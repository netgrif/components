import {Injectable} from '@angular/core';
import {SideMenuService} from '../../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {CaseViewService} from '../case-view-service';
import {ProcessService} from '../../../../process/process.service';

/**
 * Utility Service that saves you from injecting a bunch of {@link CaseViewService} dependencies.
 * Simply provide this service in your case view and use it in your local {@link CaseViewService} factory
 * to create an instance for that view.
 *
 * If you have extended {@link CaseViewService} with your own functionality, you are encouraged to extend this service as well.
 *
 * This is one of available `CaseViewServiceFactory` implementations, see {@link ConfigCaseViewServiceFactory} for another one.
 *
 * This implementation is useful if you need to provide {@link CaseViewService} without having to define it in the configuration object.
 * The down side is that no view parameters can be extracted from the configuration and so, they will not be passed to the created service.
 */
@Injectable()
export class ArrayCaseViewServiceFactory {

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _processService: ProcessService,
                protected _log: LoggerService,
                protected _translate: TranslateService) {
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @param allowedNetsIds identifiers of the allowed nets.
     * @returns an instance of {@link CaseViewService} with the provided nets set as it's `allowedNets`.
     * No view parameters are provided to the created instance.
     */
    public create(allowedNetsIds: Array<string>): CaseViewService {
        return new CaseViewService(
            this._processService.getNets(allowedNetsIds),
            this._sideMenuService,
            this._caseResourceService,
            this._log,
            this._snackBarService,
            this._searchService,
            this._translate
        );
    }
}
