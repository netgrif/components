import { DynamicEnumerationField } from './dynamic-enumeration-field';

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
});
