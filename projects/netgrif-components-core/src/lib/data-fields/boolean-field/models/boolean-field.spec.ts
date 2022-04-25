import {BooleanField} from './boolean-field';
import {TestBed} from '@angular/core/testing';

describe('BooleanField', () => {
    it('should create an instance', () => {
        expect(new BooleanField('', '', true, {
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
