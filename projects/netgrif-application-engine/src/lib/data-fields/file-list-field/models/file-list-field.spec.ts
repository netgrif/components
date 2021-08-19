import {FileListField} from './file-list-field';

describe('FileListField', () => {
  it('should create an instance', () => {
    expect(new FileListField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    })).toBeTruthy();
  });
});
