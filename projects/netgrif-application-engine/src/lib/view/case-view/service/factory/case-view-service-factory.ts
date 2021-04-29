import {Inject, Injectable, Optional} from '@angular/core';
import {SideMenuService} from '../../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {ProcessService} from '../../../../process/process.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../../user/services/user.service';
import {NAE_NEW_CASE_COMPONENT} from '../../../../side-menu/content-components/injection-tokens';
import {CaseViewService} from '../case-view-service';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {PetriNetResourceService} from '../../../../resources/engine-endpoint/petri-net-resource.service';
import {CaseViewParams} from '../../models/case-view-params';
import {Net} from '../../../../process/net';
import {NAE_NEW_CASE_CONFIGURATION} from '../../models/new-case-configuration-injection-token';
import {NewCaseConfiguration} from '../../models/new-case-configuration';
import {SearchIndexResolverService} from '../../../../search/search-keyword-resolver-service/search-index-resolver.service';

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
                protected _translate: TranslateService,
                protected _user: UserService,
                protected _petriNetResource: PetriNetResourceService,
                protected _resolver: SearchIndexResolverService,
                @Optional() @Inject(NAE_NEW_CASE_COMPONENT) protected _newCaseComponent: any,
                @Optional() @Inject(NAE_NEW_CASE_CONFIGURATION) protected _newCaseConfiguration: NewCaseConfiguration) {
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @returns an instance of {@link CaseViewService} with the provided nets set as it's `allowedNets`.
     * No view parameters are provided to the created instance.
     */
    public createWithAllNets(): CaseViewService {
        return new CaseViewService(
            this._petriNetResource.getAll().pipe(
                switchMap(nets => {
                    if (nets && Array.isArray(nets)) {
                        return this._processService.getNets(nets.map(n => n.identifier));
                    } else {
                        return of([]);
                    }
                })
            ),
            this._sideMenuService,
            this._caseResourceService,
            this._log,
            this._snackBarService,
            this._searchService,
            this._translate,
            this._user,
            this._processService,
            this._newCaseComponent,
            this._newCaseConfiguration,
            this._resolver
        );
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @param allowedNetsIds identifiers of the allowed nets.
     * @returns an instance of {@link CaseViewService} with the provided nets set as it's `allowedNets`.
     * No view parameters are provided to the created instance.
     */
    public createFromArray(allowedNetsIds: Array<string>): CaseViewService {
        return new CaseViewService(
            this._processService.getNets(allowedNetsIds),
            this._sideMenuService,
            this._caseResourceService,
            this._log,
            this._snackBarService,
            this._searchService,
            this._translate,
            this._user,
            this._processService,
            this._newCaseComponent,
            this._newCaseConfiguration,
            this._resolver
        );
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @param webViewPath path to the case view as specified in it's configuration. No leading backslash.
     * It is used to load [allowedNets]{@link SortableViewWithAllowedNets#_allowedNets$} from configuration.
     * @returns an instance of {@link CaseViewService} configured for view at the specified path.
     */
    public createFromConfig(webViewPath: string): CaseViewService {
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
                this._user,
                this._processService,
                this._newCaseComponent,
                this._newCaseConfiguration,
                this._resolver
            );
        } else {
            throw new Error(`Can't load configuration for view with webPath: '${webViewPath}'`);
        }
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @param nets is an observable of allowed nets.
     * @returns an instance of {@link CaseViewService} with the provided nets set as it's `allowedNets`.
     * No view parameters are provided to the created instance.
     */
    public createFromObservable(nets: Observable<Array<Net>>): CaseViewService {
        return new CaseViewService(
            nets,
            this._sideMenuService,
            this._caseResourceService,
            this._log,
            this._snackBarService,
            this._searchService,
            this._translate,
            this._user,
            this._processService,
            this._newCaseComponent,
            this._newCaseConfiguration,
            this._resolver
        );
    }
}
