import {I18nField} from './i18n-field';

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
});
