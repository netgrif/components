import { EnumerationField } from './enumeration-field';

describe('EnumerationField', () => {
  it('should create an instance', () => {
    expect(new EnumerationField('', '', {key: '', value: ''}, [], {})).toBeTruthy();
  });
});
