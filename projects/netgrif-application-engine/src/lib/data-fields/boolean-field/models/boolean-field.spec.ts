import { BooleanField } from './boolean-field';

describe('BooleanField', () => {
  it('should create an instance', () => {
    expect(new BooleanField('', '', true, {})).toBeTruthy();
  });
});
