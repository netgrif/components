import {ActionType, EditableAction} from './editable-action';

describe('EditableAction', () => {
  it('should create an instance', () => {
    expect(new EditableAction('', ActionType.DATA, true)).toBeTruthy();
  });
});
