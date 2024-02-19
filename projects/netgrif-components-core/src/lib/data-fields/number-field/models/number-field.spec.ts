import {NumberField} from './number-field';
import {TestBed} from '@angular/core/testing';
import {Validator} from "../../../registry/model/validator";
import {
    decimalValidation,
    evenValidation, inRangeValidation,
    negativeValidation,
    oddValidation,
    positiveValidation
} from "../../models/validation-functions";

describe('NumberField', () => {
    it('should create an instance', () => {
        expect(new NumberField('', '', 0, {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        }, [
                {name: 'odd', validationMessage: 'This is custom message!'},
                {name: 'even', validationMessage: 'This is custom message!'},
                {name: 'positive', validationMessage: 'This is custom message!'},
                {name: 'negative', validationMessage: 'This is custom message!'},
                {name: 'decimal', validationMessage: 'This is custom message!'},
                {name: 'inrange', validationMessage: 'This is custom message!', arguments: {'from': {key: 'from', value: 'inf', dynamic: false}, 'to': {key: 'to', value: '0', dynamic: false}}},
                {name: 'inrange', validationMessage: 'This is custom message!', arguments: {'from': {key: 'from', value: '0', dynamic: false}, 'to': {key: 'to', value: 'inf', dynamic: false}}},
                {name: 'inrange', validationMessage: 'This is custom message!', arguments: {'from': {key: 'from', value: '-5', dynamic: false}, 'to': {key: 'to', value: '0', dynamic: false}}},
            ],
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            new Map<string, Validator>([
                ['odd', oddValidation],
                ['even', evenValidation],
                ['positive', positiveValidation],
                ['negative', negativeValidation],
                ['decimal', decimalValidation],
                ['inrange', inRangeValidation]
            ]))).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
