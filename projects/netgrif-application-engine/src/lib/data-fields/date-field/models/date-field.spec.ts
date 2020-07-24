import {DateField} from './date-field';
import moment from 'moment';

describe('DateField', () => {

    it('should create an instance', () => {
        expect(new DateField('', '', moment(), {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        })).toBeTruthy();
    });
});
