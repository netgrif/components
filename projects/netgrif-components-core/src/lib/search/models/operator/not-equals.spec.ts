import {NotEquals} from './not-equals';
import {TestBed} from '@angular/core/testing';

describe('NotEquals', () => {
    it('should create an instance', () => {
        expect(new NotEquals()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
