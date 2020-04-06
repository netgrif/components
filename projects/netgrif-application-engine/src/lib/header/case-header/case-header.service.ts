import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';

@Injectable()
export class CaseHeaderService extends AbstractHeaderService {
    constructor() {
        super(HeaderType.CASE);
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, 'visualId', 'Visual ID', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'titleSortable', 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'author', 'Author', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'creationDateSortable', 'Creation date', 'text'),
        ];
    }
}
