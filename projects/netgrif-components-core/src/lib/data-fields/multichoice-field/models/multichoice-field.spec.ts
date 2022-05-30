import {MultichoiceField} from './multichoice-field';
import {TestBed} from '@angular/core/testing';

describe('MultichoiceField', () => {
    it('should create an instance', () => {
        expect(new MultichoiceField('', '', [], [], {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        })).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
