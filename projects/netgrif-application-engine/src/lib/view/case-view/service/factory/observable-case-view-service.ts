import {Injectable} from '@angular/core';
import {SideMenuService} from '../../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../../search/search-service/search.service';
import {ProcessService} from '../../../../process/process.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {CaseViewService} from '../case-view-service';
import {PetriNetResourceService} from '../../../../resources/engine-endpoint/petri-net-resource.service';
import {Observable} from 'rxjs';
import {Net} from '../../../../process/net';

@Injectable()
export class ObservableCaseViewServiceFactory {

    constructor(protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _processService: ProcessService,
                protected _log: LoggerService,
                protected _translate: TranslateService,
                protected _petriNetResource: PetriNetResourceService) {
    }

    /**
     * Creates an instance of {@link CaseViewService} without having to provide all the dependencies yourself.
     * @param nets is an observable of allowed nets.
     * @returns an instance of {@link CaseViewService} with the provided nets set as it's `allowedNets`.
     * No view parameters are provided to the created instance.
     */
    public create(nets: Observable<Array<Net>>): CaseViewService {
        return new CaseViewService(
            nets,
            this._sideMenuService,
            this._caseResourceService,
            this._log,
            this._snackBarService,
            this._searchService,
            this._translate
        );
    }
}
