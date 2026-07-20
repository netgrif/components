import {ActionGroup} from './action-group';
import {ActionType} from './editable-action';

describe('ActionGroup', () => {
  it('should create an instance', () => {
    expect(new ActionGroup(ActionType.DATA, '')).toBeTruthy();
  });
});
