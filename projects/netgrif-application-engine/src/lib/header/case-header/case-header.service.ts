import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {Headers} from '../headers';
import {HeaderType} from '../models/header-type';

@Injectable()
export class CaseHeaderService extends AbstractHeaderService {
    constructor() {
        super(HeaderType.CASE);
        this._headers = new Headers();
        // TODO simulated resource remove in future
        this._headers.selected = {
            column0: {
                type: 'meta',
                identifier: 'title',
                title: 'title',
                sortMode: '',
                searchQuery: '',
                columnId: 'column0',
                fieldType: 'text'
            },
            column1: {
                type: 'meta',
                identifier: 'author',
                title: 'author',
                sortMode: '',
                searchQuery: '',
                columnId: 'column1',
                fieldType: 'text'
            },
            column2: {
                type: 'immediate',
                identifier: 'zoznam',
                title: 'Zoznam vozidiel',
                sortMode: '',
                searchQuery: '',
                columnId: 'column2',
                fieldType: 'enumeration'
            },
            column3: {
                type: 'immediate',
                identifier: 'fileName',
                title: 'Názov súboru',
                sortMode: '',
                searchQuery: '',
                columnId: 'column3',
                fieldType: 'text'
            },
            column4: {
                type: 'immediate',
                identifier: 'specialnemeno2',
                title: 'Mortage prve poinne',
                sortMode: '',
                searchQuery: '',
                columnId: 'column4',
                fieldType: 'text'
            }
        };
        this.setFieldsGroupData(this.petriNetReferences);
    }
}
