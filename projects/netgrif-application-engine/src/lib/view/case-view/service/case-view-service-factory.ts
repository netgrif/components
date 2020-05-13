import {Injectable} from '@angular/core';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../search/search-service/search.service';
import {ProcessService} from '../../../process/process.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {CaseViewService} from './case-view-service';
import {CaseParams} from '../models/case-params';
import {TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';

/**
 * Utility Service that saves you from injecting a bunch of {@link CaseViewService} dependencies.
 * Simply provide this service in your case view and use it in your local {@link CaseViewService} factory
 * to create an instance for that view.
 *
 * If you have extended {@link CaseViewService} with your own functionality, you are encouraged to extend this service as well.
 */
@Injectable()
export class CaseViewServiceFactory {

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _processService: ProcessService,
                protected _configService: ConfigurationService,
                protected _log: LoggerService,
                protected _translate: TranslateService) {
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @param webViewPath path to the case view as specified in it's configuration. No leading backslash.
     * It is used to load [allowedNets]{@link CaseViewService#_allowedNets$} from configuration.
     * @returns an instance of {@link CaseViewService} configured for view at the specified path.
     */
    public create(webViewPath: string): CaseViewService {
        const view = this._configService.getViewByPath(webViewPath);
        if (view && view.layout && view.layout.params) {
            const viewParams = view.layout.params as CaseParams;
            let nets = of([]);
            if (viewParams.allowedNets !== undefined) {
                nets = this._processService.getNets(viewParams.allowedNets);
            } else {
                this._log.warn(`No 'allowedNets' provided for case view with path '${webViewPath}'`);
            }
            return new CaseViewService(
                nets,
                this._sideMenuService,
                this._caseResourceService,
                this._log,
                this._snackBarService,
                this._searchService,
                this._translate,
                viewParams);
        } else {
            throw new Error(`Can't load configuration for view with webPath: '${webViewPath}'`);
        }
    }
}
