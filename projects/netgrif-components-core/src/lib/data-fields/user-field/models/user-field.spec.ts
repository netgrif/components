import {UserField} from './user-field';

describe('UserField', () => {
  it('should create an instance', () => {
    expect(new UserField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, [])).toBeTruthy();
  });
});
