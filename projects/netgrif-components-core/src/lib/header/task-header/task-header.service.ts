import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn} from '../models/header-column';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {Subscription} from 'rxjs';
import {NAE_DEFAULT_HEADERS} from '../models/default-headers-token';
import {ViewIdService} from '../../user/services/view-id.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {OverflowService} from '../services/overflow.service';
import {HeaderSortingMode} from '../models/header-sorting-mode';
import {NAE_HEADER_SORTING_MODE} from '../models/header-sorting-mode-injection-token';
import {getTaskMetaHeaders} from '../models/meta-fields-factory';

@Injectable()
export class TaskHeaderService extends AbstractHeaderService implements OnDestroy {
    protected subAllowedNets: Subscription;

    constructor(protected _allowedNetsService: AllowedNetsService,
                preferences: UserPreferenceService,
                logger: LoggerService,
                @Optional() viewIdService: ViewIdService,
                @Optional() overflowService: OverflowService,
                @Optional() @Inject(NAE_DEFAULT_HEADERS) naeDefaultHeaders: Array<string>,
                @Optional() @Inject(NAE_HEADER_SORTING_MODE) sortingMode: HeaderSortingMode = HeaderSortingMode.SINGLE) {
        super(HeaderType.TASK, preferences, logger, viewIdService, overflowService, sortingMode);
        this.subAllowedNets = _allowedNetsService.allowedNets$.subscribe(allowedNets => {
            this.setTaskAllowedNets(allowedNets);
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
        return getTaskMetaHeaders();
    }

    protected saveState() {
    }

    protected saveNewState() {
    }

    protected restoreLastState() {
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subAllowedNets.unsubscribe();
    }
}
