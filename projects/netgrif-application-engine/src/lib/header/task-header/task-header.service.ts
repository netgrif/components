import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';

@Injectable()
export class TaskHeaderService extends AbstractHeaderService {
    constructor() {
        super(HeaderType.TASK);
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, 'case', 'Case', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'title', 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'priority', 'Priority', 'enumeration'),
            new HeaderColumn(HeaderColumnType.META, 'user', 'User', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'assign-date', 'Assign date', 'text'),
        ];
    }

}
