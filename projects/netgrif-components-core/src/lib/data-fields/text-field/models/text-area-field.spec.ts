import {TextAreaField} from './text-area-field';
import {TestBed} from '@angular/core/testing';

describe('TextAreaField', () => {
    it('should create an instance', () => {
        expect(new TextAreaField('', '', '', {
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
