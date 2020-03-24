import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {Headers} from '../headers';

@Injectable()
export class CaseHeaderService extends AbstractHeaderService {
    constructor() {
        super('case');
        this._headers = new Headers();
        // TODO simulated resource remove in future
        this.petriNetReferences.push({
            author: {
                email: 'example email',
                fullName: 'Jozef Machac'
            },
            createdDate: new Date(),
            defaultCaseName: 'Som default case name',
            identifier: 'mortgage',
            immediateData: [{
                stringId: 'specialnemeno',
                title: 'Mortage prve poinne',
                type: 'file'
            }, {
                stringId: 'specialnemeno2',
                title: 'Mortage prve poinne',
                type: 'text'
            }, {
                stringId: 'specialnemeno3',
                title: 'Typ',
                type: 'enumeration'
            }],
            initials: 'QQQ',
            stringId: 'stringId123231231',
            title: 'Financial data',
            version: '1.0.0'
        }, {
            author: {
                email: 'example email',
                fullName: 'Martin Miklovic'
            },
            createdDate: new Date(),
            defaultCaseName: 'Som default case name',
            identifier: 'address',
            immediateData: [{
                stringId: 'zoznam',
                title: 'Zoznam vozidiel',
                type: 'file'
            }, {
                stringId: 'fileName',
                title: 'Názov súboru',
                type: 'text'
            }, {
                stringId: 'typ',
                title: 'Typ',
                type: 'enumeration'
            }, {
                stringId: 'IDSet',
                title: 'ID set',
                type: 'enumeration'
            }],
            initials: 'RRR',
            stringId: 'stringId123231231',
            title: 'Financial data',
            version: '1.0.0'
        });
        // TODO simulated resource remove in future
        this._headers.selected = {
            column0: {
                type: 'meta',
                identifier: 'title',
                title: 'title',
                sortMode: '',
                searchQuery: '',
                columnId: 'column0'
            },
            column1: {
                type: 'meta',
                identifier: 'author',
                title: 'author',
                sortMode: '',
                searchQuery: '',
                columnId: 'column1'
            },
            column2: {
                type: 'immediate',
                identifier: 'zoznam',
                title: 'Zoznam vozidiel',
                sortMode: '',
                searchQuery: '',
                columnId: 'column2'
            },
            column3: {
                type: 'immediate',
                identifier: 'fileName',
                title: 'Názov súboru',
                sortMode: '',
                searchQuery: '',
                columnId: 'column3'
            },
            column4: {
                type: 'immediate',
                identifier: 'specialnemeno2',
                title: 'Mortage prve poinne',
                sortMode: '',
                searchQuery: '',
                columnId: 'column4'
            }
        };
        this.setFieldsGroupData(this.petriNetReferences);
    }
}
