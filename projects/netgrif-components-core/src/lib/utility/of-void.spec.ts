import {ofVoid} from './of-void';
import {TestBed} from '@angular/core/testing';

describe('ofVoid', () => {

    it('should emit', () => {
        const sub = ofVoid().subscribe();
        expect(sub.closed).toBeTrue();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

});
