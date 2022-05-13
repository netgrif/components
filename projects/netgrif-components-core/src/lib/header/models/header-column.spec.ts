import {HeaderColumn, HeaderColumnType} from './header-column';
import {TestBed} from '@angular/core/testing';

describe('HeaderColumn', () => {
    it('should create an instance', () => {
        expect(new HeaderColumn(HeaderColumnType.META, '', '', '')).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
