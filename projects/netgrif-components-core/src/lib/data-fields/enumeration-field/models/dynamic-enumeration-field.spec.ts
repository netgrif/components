import {DynamicEnumerationField} from './dynamic-enumeration-field';
import {TestBed} from '@angular/core/testing';

describe('DynamicEnumerationField', () => {
    it('should create an instance', () => {
        expect(new DynamicEnumerationField('', '', '', [], {
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
