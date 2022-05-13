import {TextField} from './text-field';
import {TestBed} from '@angular/core/testing';

describe('TextField', () => {
    it('should create an instance', () => {
        expect(new TextField('', '', '', {
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
