import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn} from '../models/header-column';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_DEFAULT_HEADERS} from '../models/default-headers-token';
import {Subscription} from 'rxjs';
import {OverflowService} from '../services/overflow.service';
import {ViewIdService} from '../../user/services/view-id.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {HeaderSortingMode} from '../models/header-sorting-mode';
import {NAE_HEADER_SORTING_MODE} from '../models/header-sorting-mode-injection-token';
import {getCaseMetaHeaders} from '../models/meta-fields-factory';


@Injectable()
export class CaseHeaderService extends AbstractHeaderService implements OnDestroy {
    protected subAllowedNets: Subscription;

    constructor(protected _allowedNetsService: AllowedNetsService,
                preferences: UserPreferenceService,
                logger: LoggerService,
                @Optional() viewIdService: ViewIdService,
                @Optional() protected overflowService: OverflowService,
                @Optional() @Inject(NAE_DEFAULT_HEADERS) naeDefaultHeaders: Array<string>,
                @Optional() @Inject(NAE_HEADER_SORTING_MODE) sortingMode: HeaderSortingMode = HeaderSortingMode.SINGLE) {
        super(HeaderType.CASE, preferences, logger, viewIdService, overflowService, sortingMode);
        this.subAllowedNets = _allowedNetsService.allowedNets$.subscribe(allowedNets => {
            this.setAllowedNets(allowedNets);
            if (naeDefaultHeaders && Array.isArray(naeDefaultHeaders) && naeDefaultHeaders.length > 0) {
                this.initDefaultHeaders = naeDefaultHeaders;
                this.initializeDefaultHeaderState();
            } else {
                this.loadHeadersFromPreferences();
                this.loadSortsFromPreferences();
            }
            this.loading.off();
        });
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return getCaseMetaHeaders();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subAllowedNets.unsubscribe();
    }

    public updateColumnCount() {
        this.updateHeaderColumnCount();
    }

    protected saveState() {
        if (this.overflowService) {
            this.overflowService.saveState();
        }
    }

    protected saveNewState() {
        if (this.overflowService) {
            this.overflowService.saveNewState();
        }
        this.updateHeaderColumnCount();
    }

    protected restoreLastState() {
        if (this.overflowService) {
            this.overflowService.restoreLastState();
        }
    }
}
