import {PortalWrapper} from './portal-wrapper';
import {TestBed} from '@angular/core/testing';

describe('PortalWrapper', () => {
    it('should create an instance', () => {
        expect(new PortalWrapper(null, null)).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
