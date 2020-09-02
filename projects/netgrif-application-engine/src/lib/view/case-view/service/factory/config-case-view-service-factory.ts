import {Inject, Injectable, Optional} from '@angular/core';
import {SideMenuService} from '../../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {ProcessService} from '../../../../process/process.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {CaseViewService} from '../case-view-service';
import {CaseViewParams} from '../../models/case-view-params';
import {TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {NAE_NEW_CASE_COMPONENT} from '../../../../side-menu/content-components/injection-tokens';

/**
 * Utility Service that saves you from injecting a bunch of {@link CaseViewService} dependencies.
 * Simply provide this service in your case view and use it in your local {@link CaseViewService} factory
 * to create an instance for that view.
 *
 * If you have extended {@link CaseViewService} with your own functionality, you are encouraged to extend this service as well.
 *
 * This is one of available `CaseViewServiceFactory` implementations, see {@link ArrayCaseViewServiceFactory} for another one.
 *
 * This implementation is useful if you need to provide {@link CaseViewService} and have a view with `allowedNets`
 * defined in your configuration. The benefit of this approach is that you can pass view parameters from the configuration to the service
 * as well as the allowed nets.
 */
@Injectable()
export class ConfigCaseViewServiceFactory {

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _processService: ProcessService,
                protected _configService: ConfigurationService,
                protected _log: LoggerService,
                protected _translate: TranslateService,
                @Optional() @Inject(NAE_NEW_CASE_COMPONENT) protected _newCaseComponent: any) {
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @param webViewPath path to the case view as specified in it's configuration. No leading backslash.
     * It is used to load [allowedNets]{@link SortableViewWithAllowedNets#_allowedNets$} from configuration.
     * @returns an instance of {@link CaseViewService} configured for view at the specified path.
     */
    public create(webViewPath: string): CaseViewService {
        const view = this._configService.getViewByPath(webViewPath);
        if (view && view.layout && view.layout.params) {
            const viewParams = view.layout.params as CaseViewParams;
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
                this._newCaseComponent);
        } else {
            throw new Error(`Can't load configuration for view with webPath: '${webViewPath}'`);
        }
    }
}
