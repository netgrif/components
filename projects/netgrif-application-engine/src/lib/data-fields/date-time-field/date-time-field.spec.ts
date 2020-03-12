import { DateTimeField } from './date-time-field';

describe('DatetimeField', () => {
  it('should create an instance', () => {
    expect(new DateTimeField('', '', new Date(), {})).toBeTruthy();
  });
});
