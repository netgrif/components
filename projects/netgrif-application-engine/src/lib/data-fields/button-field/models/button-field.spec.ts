import { ButtonField } from './button-field';

describe('ButtonField', () => {
  it('should create an instance', () => {
    expect(new ButtonField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    })).toBeTruthy();
  });
});
