import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';


export enum TaskMetaField {
    CASE = 'case',
    TITLE = 'title',
    PRIORITY = 'priority',
    USER = 'user',
    ASSIGN_DATE = 'assign-date',
}

@Injectable()
export class TaskHeaderService extends AbstractHeaderService {
    constructor() {
        super(HeaderType.TASK);
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.CASE, 'Case', 'text'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.TITLE, 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.PRIORITY, 'Priority', 'enumeration'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.USER, 'User', 'text'),
            new HeaderColumn(HeaderColumnType.META, TaskMetaField.ASSIGN_DATE, 'Assign date', 'text'),
        ];
    }

}
