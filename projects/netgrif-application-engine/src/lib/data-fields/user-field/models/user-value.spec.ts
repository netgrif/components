import { UserValue } from './user-value';

describe('UserValue', () => {
  it('should create an instance', () => {
    expect(new UserValue(0, '', '', '')).toBeTruthy();
  });
});
