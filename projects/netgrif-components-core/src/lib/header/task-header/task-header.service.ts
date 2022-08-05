import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {TaskMetaField} from './task-meta-enum';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {Subscription} from 'rxjs';
import {NAE_DEFAULT_HEADERS} from '../models/default-headers-token';
import {ViewIdService} from '../../user/services/view-id.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {OverflowService} from '../services/overflow.service';


@Injectable()
export class TaskHeaderService extends AbstractHeaderService implements OnDestroy {
    protected subAllowedNets: Subscription;

    constructor(protected _allowedNetsService: AllowedNetsService,
                preferences: UserPreferenceService,
                logger: LoggerService,
                @Optional() viewIdService: ViewIdService,
                @Optional() protected overflowService: OverflowService,
                @Optional() @Inject(NAE_DEFAULT_HEADERS) naeDefaultHeaders: Array<string>) {
        super(HeaderType.TASK, preferences, viewIdService, overflowService, logger);
        this.subAllowedNets = _allowedNetsService.allowedNets$.subscribe(allowedNets => {
            this.setTaskAllowedNets(allowedNets);
            if (naeDefaultHeaders && Array.isArray(naeDefaultHeaders) && naeDefaultHeaders.length > 0) {
                this.initDefaultHeaders = naeDefaultHeaders;
                this.initializeDefaultHeaderState();
            } else {
                this.loadHeadersFromPreferences();
            }
            this.loading.off();
        });
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'headers.taskMeta.case', 'text'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE_ID, 'headers.taskMeta.caseID', 'text', false),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.TASK_ID, 'headers.taskMeta.taskID', 'text', false),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'headers.caseMeta.title', 'text'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.PRIORITY, 'headers.taskMeta.priority', 'enumeration'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.USER, 'headers.taskMeta.user', 'text'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.ASSIGN_DATE, 'headers.taskMeta.assignDate', 'date'),
        ];
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
