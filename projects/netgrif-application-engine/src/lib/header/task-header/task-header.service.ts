import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {TaskMetaField} from './task-meta-enum';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {ViewIdService} from '../../user/services/view-id.service';



@Injectable()
export class TaskHeaderService extends AbstractHeaderService {
    constructor(preferences: UserPreferenceService, viewIdService: ViewIdService, logger: LoggerService) {
        super(HeaderType.TASK, preferences, viewIdService, logger);
        this.loadHeadersFromPreferences();
        this.loading.off();
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'headers.taskMeta.case', 'text'),
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
}
