import {EnumerationField} from './enumeration-field';
import {TestBed} from '@angular/core/testing';

describe('EnumerationField', () => {
    it('should create an instance', () => {
        expect(new EnumerationField('', '', '', [], {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        })).toBeTruthy();
    });

    it('should use the typed default component when the component name is empty', () => {
        const field = new EnumerationField('', '', '', [], {}, undefined, undefined, undefined,
            undefined, undefined, {name: ''});

        expect(field.getComponentType()).toBe('default');
        expect(field.getTypedComponentType()).toBe('enumeration-default');
        expect(field.getTypedDefaultComponentType()).toBe('enumeration-default');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
