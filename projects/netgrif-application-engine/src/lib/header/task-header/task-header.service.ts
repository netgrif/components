import {Injectable} from '@angular/core';
import {AbstractHeaderService} from "../abstract-header-service";
import {Headers} from "../headers";

@Injectable()
export class TaskHeaderService extends AbstractHeaderService {
    constructor() {
        super("task");
        this._headers = new Headers();
        // TODO simulated resource remove in future
        this._headers.selected = {
            column0: {
                type: 'meta',
                identifier: 'case',
                title: 'Case',
                sortMode: '',
                searchQuery: '',
                columnId: 'column0'
            },
            column1: {
                type: 'meta',
                identifier: 'title',
                title: 'Title',
                sortMode: '',
                searchQuery: '',
                columnId: 'column1'
            },
            column2: {
                type: 'meta',
                identifier: 'priority',
                title: 'Priority',
                sortMode: '',
                searchQuery: '',
                columnId: 'column2'
            },
            column3: {
                type: 'meta',
                identifier: 'user',
                title: 'User',
                sortMode: '',
                searchQuery: '',
                columnId: 'column3'
            },
            column4: {
                type: 'meta',
                identifier: 'assign-date',
                title: 'Assign date',
                sortMode: '',
                searchQuery: '',
                columnId: 'column4'
            }
        };
    }

}
