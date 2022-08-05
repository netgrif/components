import {Injectable, OnDestroy, Optional} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {WorkflowMetaField} from './workflow-meta-enum';
import {ViewIdService} from '../../user/services/view-id.service';
import {OverflowService} from '../services/overflow.service';

@Injectable()
export class WorkflowHeaderService extends AbstractHeaderService implements OnDestroy {

    constructor(preferences: UserPreferenceService,
                @Optional() viewIdService: ViewIdService,
                @Optional() protected overflowService: OverflowService,
                logger: LoggerService) {
        super(HeaderType.WORKFLOW, preferences, viewIdService, overflowService, logger);
        this.loadHeadersFromPreferences();
        this.loading.off();
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'headers.workflowMeta.initials', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'headers.workflowMeta.title', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.NET_ID, 'headers.workflowMeta.netId', 'text', false),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'headers.workflowMeta.version', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'headers.workflowMeta.author', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.CREATION_DATE, 'headers.workflowMeta.creationDate', 'date'),
        ];
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
