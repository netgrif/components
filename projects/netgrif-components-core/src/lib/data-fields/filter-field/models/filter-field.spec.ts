import {FilterField} from './filter-field';
import {TestBed} from '@angular/core/testing';
import {FieldTypeResource} from "../../../task-content/model/field-type-resource";

describe('FilterField', () => {
    it('should create an instance', () => {
        expect(new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '')).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
