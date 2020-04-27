import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';


export enum CaseMetaField {
    VISUAL_ID = 'visualId',
    TITLE = 'title',
    AUTHOR = 'author',
    CREATION_DATE = 'creationDate',
}

@Injectable()
export class CaseHeaderService extends AbstractHeaderService {
    constructor() {
        super(HeaderType.CASE);
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.VISUAL_ID, 'Visual ID', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.TITLE, 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'Author', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.CREATION_DATE, 'Creation date', 'text'),
        ];
    }
}
