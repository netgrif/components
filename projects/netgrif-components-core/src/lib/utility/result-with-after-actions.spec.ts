import {ResultWithAfterActions} from './result-with-after-actions';
import {TestBed} from '@angular/core/testing';

describe('ResultWithAfterActions', () => {
    it('should create an instance', () => {
        const result = new ResultWithAfterActions(true);
        expect(result).toBeTruthy();
        expect(result.result).toBeTrue();
    });

    it('should run no after actions', () => {
        const result = new ResultWithAfterActions(true);
        expect(result).toBeTruthy();
        expect(result.executeAfterActions()).toBeUndefined();
    });

    it('should run after actions', () => {
        let a = 0;
        const result = new ResultWithAfterActions(true, [() => {
            a = 1;
        }]);
        expect(result).toBeTruthy();
        expect(a).toEqual(0);
        expect(result.executeAfterActions()).toBeUndefined();
        expect(a).toEqual(1);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
