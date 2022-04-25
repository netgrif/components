import {EnumerationField} from './enumeration-field';
import {TestBed} from '@angular/core/testing';

describe('EnumerationField', () => {
    it('should create an instance', () => {
        expect(new EnumerationField('', '', '', [], {
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
