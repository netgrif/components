import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderState} from '../headerState';
import {HeaderType} from '../models/header-type';

@Injectable()
export class TaskHeaderService extends AbstractHeaderService {
    constructor() {
        super(HeaderType.TASK);
        this._headerState = new HeaderState();
        // TODO simulated resource remove in future
        this._headerState.selectedHeaders = {
            column0: {
                type: 'meta',
                identifier: 'case',
                title: 'Case',
                sortMode: '',
                searchQuery: '',
                columnId: 'column0',
                fieldType: 'text'
            },
            column1: {
                type: 'meta',
                identifier: 'title',
                title: 'Title',
                sortMode: '',
                searchQuery: '',
                columnId: 'column1',
                fieldType: 'text'
            },
            column2: {
                type: 'meta',
                identifier: 'priority',
                title: 'Priority',
                sortMode: '',
                searchQuery: '',
                columnId: 'column2',
                fieldType: 'enumeration'
            },
            column3: {
                type: 'meta',
                identifier: 'user',
                title: 'User',
                sortMode: '',
                searchQuery: '',
                columnId: 'column3',
                fieldType: 'text'
            },
            column4: {
                type: 'meta',
                identifier: 'assign-date',
                title: 'Assign date',
                sortMode: '',
                searchQuery: '',
                columnId: 'column4',
                fieldType: 'text'
            }
        };
    }

}
