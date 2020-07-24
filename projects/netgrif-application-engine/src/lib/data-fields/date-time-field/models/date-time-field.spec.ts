import {DateTimeField} from './date-time-field';
import moment from 'moment';

describe('DatetimeField', () => {
    it('should create an instance', () => {
      expect(new DateTimeField('', '', moment(), {
          required: true,
          optional: true,
          visible: true,
          editable: true,
          hidden: true
      })).toBeTruthy();
    });
});
