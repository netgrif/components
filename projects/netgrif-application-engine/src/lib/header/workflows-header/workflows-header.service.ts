import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';

@Injectable({
    providedIn: 'root'
})
export class WorkflowsHeaderService extends AbstractHeaderService {

    constructor() {
        super(HeaderType.WORKFLOW);
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, 'initials', 'Initials', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'title', 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'version', 'Version', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'author', 'Author', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'createdDate', 'Upload date', 'date'),
        ];
    }
}
