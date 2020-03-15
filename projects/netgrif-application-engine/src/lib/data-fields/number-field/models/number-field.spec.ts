import { NumberField } from './number-field';

describe('NumberField', () => {
  it('should create an instance', () => {
    expect(new NumberField('', '', 0, {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    })).toBeTruthy();
  });
});
