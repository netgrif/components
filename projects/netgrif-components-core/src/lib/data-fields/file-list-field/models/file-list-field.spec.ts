import {FileListField} from './file-list-field';
import {TestBed} from '@angular/core/testing';

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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
