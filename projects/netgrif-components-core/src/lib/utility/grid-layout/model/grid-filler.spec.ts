import {GridFiller} from './grid-filler';
import {TestBed} from '@angular/core/testing';

describe(' GridFiller', () => {
    it('should create an instance', () => {
        expect(new GridFiller(0, 0)).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
