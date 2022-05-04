import {Substring} from './substring';
import {TestBed} from '@angular/core/testing';

describe('Substring', () => {
    it('should create an instance', () => {
        expect(new Substring()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
