import { UserField } from './user-field';

describe('UserField', () => {
  it('should create an instance', () => {
    expect(new UserField('', '', {}, undefined, [])).toBeTruthy();
  });
});
