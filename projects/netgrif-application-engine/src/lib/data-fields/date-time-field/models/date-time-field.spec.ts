import { DateTimeField } from './date-time-field';

describe('DatetimeField', () => {
  it('should create an instance', () => {
    expect(new DateTimeField('', '', new Date(), {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    })).toBeTruthy();
  });
});
