import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';


export enum WorkflowMetaField {
    INITIALS = 'initials',
    TITLE = 'title',
    VERSION = 'version',
    AUTHOR = 'author',
    CREATION_DATE = 'createdDate',
}

@Injectable()
export class WorkflowHeaderService extends AbstractHeaderService {

    constructor() {
        super(HeaderType.WORKFLOW);
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'Initials', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'Version', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'Author', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.CREATION_DATE, 'Upload date', 'date'),
        ];
    }
}
