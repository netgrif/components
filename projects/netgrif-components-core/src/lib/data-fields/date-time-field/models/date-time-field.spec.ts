import {DateTimeField} from './date-time-field';
import moment from 'moment';
import {TestBed} from '@angular/core/testing';

describe('DatetimeField', () => {
    it('should create an instance', () => {
        expect(new DateTimeField('', '', moment(), {
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
