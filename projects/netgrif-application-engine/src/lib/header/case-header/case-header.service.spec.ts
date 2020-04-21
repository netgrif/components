import {TestBed} from '@angular/core/testing';

import {CaseHeaderService} from './case-header.service';
import {HeaderType} from '../models/header-type';

describe('CaseHeaderService', () => {
    let service: CaseHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [CaseHeaderService]});
        service = TestBed.inject(CaseHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('get header type = case', () => {
        expect(service.headerType).toEqual(HeaderType.CASE);
    });

    it('get header change', () => {
        expect(service.headerChange$.subscribe()).toBeTruthy();
    });

    it('set allowed nets', () => {
        service.setAllowedNets([{
            stringId: 'string',
            title: 'string',
            identifier: 'string',
            version: 'string',
            initials: 'string',
            defaultCaseName: 'string',
            createdDate: [2020, 1, 1, 10, 0],
            author: {email: 'email', fullName: 'fullName'},
            immediateData: [{stringId: 'string', title: 'string', type: 'string'}]
        }]);
        expect(service.fieldsGroup.length).toEqual(2);
    });
});
