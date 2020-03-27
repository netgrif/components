import {Injectable} from '@angular/core';
import {Headers} from '../headers';
import {AbstractHeaderService} from '../abstract-header-service';
import {WorkflowsPanelGroupService} from '../../workflows/workflows-panel-group/services/workflows-panel-group.service';

@Injectable({
    providedIn: 'root'
})
export class WorkflowsHeaderService extends AbstractHeaderService {

    constructor() {
        super('workflow');
        this._headers = new Headers();
        // TODO simulated resource remove in future
        this._headers.selected = {
            column0: {
                type: 'meta',
                identifier: 'initials',
                title: 'initials',
                sortMode: '',
                searchQuery: '',
                columnId: 'column0',
                fieldType: 'text'
            },
            column1: {
                type: 'meta',
                identifier: 'title',
                title: 'title',
                sortMode: '',
                searchQuery: '',
                columnId: 'column1',
                fieldType: 'text'
            },
            column2: {
                type: 'meta',
                identifier: 'version',
                title: 'version',
                sortMode: '',
                searchQuery: '',
                columnId: 'column2',
                fieldType: 'enumeration'
            },
            column3: {
                type: 'meta',
                identifier: 'author',
                title: 'author',
                sortMode: '',
                searchQuery: '',
                columnId: 'column3',
                fieldType: 'text'
            },
            column4: {
                type: 'meta',
                identifier: 'createdDate',
                title: 'Upload date',
                sortMode: '',
                searchQuery: '',
                columnId: 'column4',
                fieldType: 'date'
            }
        };
    }
}
