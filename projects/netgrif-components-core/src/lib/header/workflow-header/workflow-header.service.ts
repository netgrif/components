import {Injectable, OnDestroy, Optional} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn} from '../models/header-column';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {ViewIdService} from '../../user/services/view-id.service';
import {OverflowService} from '../services/overflow.service';
import {getWorkflowMetaHeaders} from "../models/meta-fields-factory";

@Injectable()
export class WorkflowHeaderService extends AbstractHeaderService implements OnDestroy {

    constructor(preferences: UserPreferenceService,
                logger: LoggerService,
                @Optional() viewIdService: ViewIdService,
                @Optional() overflowService: OverflowService) {
        super(HeaderType.WORKFLOW, preferences, logger, viewIdService, overflowService);
        this.loadHeadersFromPreferences();
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
