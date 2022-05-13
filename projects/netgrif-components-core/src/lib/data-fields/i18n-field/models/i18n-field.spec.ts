import {I18nField} from './i18n-field';
import {TestBed} from '@angular/core/testing';

describe('I18nField', () => {
    it('should create an instance', () => {
        expect(new I18nField('', '', '', {
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
