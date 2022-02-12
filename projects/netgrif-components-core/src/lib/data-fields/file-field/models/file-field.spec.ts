import {FileField} from './file-field';

describe(' FileField', () => {
    it('should create an instance', () => {
        expect(new FileField('', '', {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        })).toBeTruthy();
    });
});
