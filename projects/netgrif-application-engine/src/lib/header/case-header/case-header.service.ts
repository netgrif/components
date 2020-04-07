import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {Headers} from '../headers';

@Injectable()
export class CaseHeaderService extends AbstractHeaderService {
    constructor() {
        super('case');
        this._headers = new Headers();
        // TODO simulated resource remove in future
        this._headers.selected = {
            column0: {
                type: 'meta',
                identifier: 'visualId',
                title: 'Visual ID',
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
                identifier: 'author',
                title: 'Author',
                sortMode: '',
                searchQuery: '',
                columnId: 'column2',
                fieldType: 'text'
            },
            column3: {
                type: 'meta',
                identifier: 'creation',
                title: 'Creation Date',
                sortMode: '',
                searchQuery: '',
                columnId: 'column3',
                fieldType: 'text'
            },
            column4: {
                type: 'meta',
                identifier: '',
                title: '',
                sortMode: '',
                searchQuery: '',
                columnId: 'column4',
                fieldType: 'text'
            }
        };
        this.setFieldsGroupData(this.petriNetReferences);
    }
}
