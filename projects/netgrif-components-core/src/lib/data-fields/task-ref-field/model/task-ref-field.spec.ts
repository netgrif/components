import {TaskRefField} from './task-ref-field';

describe('TaskRefField', () => {
    it('should create an instance', () => {
        expect(new TaskRefField('', '', [''], {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        })).toBeTruthy();
    });
});
