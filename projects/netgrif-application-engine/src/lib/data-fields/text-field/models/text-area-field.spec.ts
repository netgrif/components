import {TextAreaField} from './text-area-field';

describe('TextAreaField', () => {
  it('should create an instance', () => {
      expect(new TextAreaField('', '', '', {
          required: true,
          optional: true,
          visible: true,
          editable: true,
          hidden: true
      })).toBeTruthy();
  });
});
