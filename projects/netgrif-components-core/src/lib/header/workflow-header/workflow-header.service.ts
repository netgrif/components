import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn} from '../models/header-column';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {ViewIdService} from '../../user/services/view-id.service';
import {OverflowService} from '../services/overflow.service';
import {HeaderSortingMode} from '../models/header-sorting-mode';
import {NAE_HEADER_SORTING_MODE} from '../models/header-sorting-mode-injection-token';
import {getWorkflowMetaHeaders} from '../models/meta-fields-factory';

@Injectable()
export class WorkflowHeaderService extends AbstractHeaderService implements OnDestroy {

    constructor(preferences: UserPreferenceService,
                logger: LoggerService,
                @Optional() viewIdService: ViewIdService,
                @Optional() overflowService: OverflowService,
                @Optional() @Inject(NAE_HEADER_SORTING_MODE) sortingMode: HeaderSortingMode = HeaderSortingMode.SINGLE) {
        super(HeaderType.WORKFLOW, preferences, logger, viewIdService, overflowService, sortingMode);
        this.loadHeadersFromPreferences();
        this.loadSortsFromPreferences();
        this.loading.off();
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return getWorkflowMetaHeaders();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected saveState() {
    }

    protected saveNewState() {
    }

    protected restoreLastState() {
    }
}
