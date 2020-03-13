import { DateTimeField } from './date-time-field';

describe('DatetimeField', () => {
  it('should create an instance', () => {
    expect(new DateTimeField("date time", "placeholder", new Date())).toBeTruthy();
  });
});
