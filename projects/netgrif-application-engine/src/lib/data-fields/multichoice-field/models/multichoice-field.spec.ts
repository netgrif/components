import {MultichoiceField} from './multichoice-field';

describe('MultichoiceField', () => {
  it('should create an instance', () => {
    expect(new MultichoiceField('', '', [], [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    })).toBeTruthy();
  });
});
