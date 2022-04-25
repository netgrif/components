import {TestBed} from '@angular/core/testing';

import {CaseListFontColorService} from './case-list-font-color.service';

describe('CaseListFontColorService', () => {
    let service: CaseListFontColorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CaseListFontColorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should cache result', () => {
        const color = service.computeCaseFontColor('#000000');
        expect(color).toEqual('white');
        expect(service.cache['#000000']).toEqual(color);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
