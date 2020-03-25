import { DateField } from './date-field';

describe('DateField', () => {
  it('should create an instance', () => {
    expect(new DateField('', '', new Date(), {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    })).toBeTruthy();
  });
});
