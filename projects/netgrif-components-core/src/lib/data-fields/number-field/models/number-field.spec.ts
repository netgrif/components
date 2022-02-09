import {NumberField} from './number-field';

describe('NumberField', () => {
  it('should create an instance', () => {
    expect(new NumberField('', '', 0, {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, [
        {validationRule: 'odd', validationMessage: ''},
        {validationRule: 'even', validationMessage: ''},
        {validationRule: 'positive', validationMessage: ''},
        {validationRule: 'negative', validationMessage: ''},
        {validationRule: 'decimal', validationMessage: ''},
        {validationRule: 'inrange inf,0', validationMessage: ''},
        {validationRule: 'inrange 0,inf', validationMessage: ''},
        {validationRule: 'inrange -5,0', validationMessage: ''},
    ])).toBeTruthy();
  });
});
