import {NumberField} from './number-field';
import {TestBed} from '@angular/core/testing';

describe('NumberField', () => {
    it('should create an instance', () => {
        expect(new NumberField('', '', 0, {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        }, [
            {name: 'odd', message: ''},
            {name: 'even', message: ''},
            {name: 'positive', message: ''},
            {name: 'negative', message: ''},
            {name: 'decimal', message: ''},
            {name: 'inrange', message: 'This is custom message!', clientArguments: ['inf', '0']},
            {name: 'inrange', message: 'This is custom message!', clientArguments: ['0', 'inf']},
            {name: 'inrange', message: 'This is custom message!', clientArguments: ['-5', '0']},
        ])).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
