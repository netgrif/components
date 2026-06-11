import {ActionEditorService} from '../action-editor.service';
import {ActionType} from './editable-action';
import {LeafNode} from './leaf-node';

describe('LeafNode', () => {
  it('should create an instance', () => {
    expect(new LeafNode(ActionType.TRANSITION, new ActionEditorService())).toBeTruthy();
  });
});
