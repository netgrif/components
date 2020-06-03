import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {ViewService} from '../../routing/view-service/view.service';


export enum WorkflowMetaField {
    INITIALS = 'initials',
    TITLE = 'title',
    VERSION = 'version',
    AUTHOR = 'author',
    CREATION_DATE = 'creationDate',
}

@Injectable()
export class WorkflowHeaderService extends AbstractHeaderService {

    constructor(preferences: UserPreferenceService, viewService: ViewService) {
        super(HeaderType.WORKFLOW, preferences, viewService);
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'headers.workflowMeta.initials', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'headers.caseMeta.title', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'headers.workflowMeta.version', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'headers.caseMeta.author', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.CREATION_DATE, 'headers.workflowMeta.creationDate', 'date'),
        ];
    }
}
