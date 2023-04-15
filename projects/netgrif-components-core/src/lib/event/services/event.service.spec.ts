import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {createMockSetDataOutcome} from '../../utility/tests/utility/create-mock-set-data-outcome';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {createMockCase} from '../../utility/tests/utility/create-mock-case';
import {ChangedFieldsMap} from './interfaces/changed-fields-map';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FieldTypeResource} from "../../task-content/model/field-type-resource";
import {DataFieldResource} from "../../task-content/model/resource-interfaces";

describe('EventService', () => {
    let service: EventService;

    const secondChildOutcome = createMockSetDataOutcome({
        fields: {
            secondChildOutcome: {
                value: {
                    value: 'secondChildOutcomeValue',
                },
                type: FieldTypeResource.TEXT
            } as DataFieldResource
        }
    }, createMockTask('secondChildOutcomeTask'), undefined, createMockCase('secondChildOutcomeCase'));

    const firstChildOutcome = createMockSetDataOutcome({
        fields: {
            firstChildOutcome: {
                value: {
                    value: 'firstChildOutcomeValue',
                },
                type: FieldTypeResource.TEXT
            } as DataFieldResource
        }
    }, createMockTask('firstChildOutcomeTask'), undefined, createMockCase('firstChildOutcomeCase'), [secondChildOutcome]);

    const mainOutcome = createMockSetDataOutcome({
        fields: {
            shouldNotBeIncluded: {
                value: {
                    value: 'parentField',
                },
                type: FieldTypeResource.TEXT
            } as DataFieldResource
        }
    }, createMockTask('parentOutcomeTask'), undefined, createMockCase('parentOutcomeCase'), [firstChildOutcome]);

    const resultChangedFieldsMap: ChangedFieldsMap = {
        firstChildOutcomeCase: {
            firstChildOutcomeTask: {
                taskId: 'firstChildOutcomeTask',
                firstChildOutcome: {
                    value: 'firstChildOutcomeValue',
                    type: 'text'
                },
            }
        },
        secondChildOutcomeCase: {
            secondChildOutcomeTask: {
                taskId: 'secondChildOutcomeTask',
                secondChildOutcome: {
                    value: 'secondChildOutcomeValue',
                    type: 'text'
                }
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [NoopAnimationsModule]});
        service = TestBed.inject(EventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should parse changedFields from outcome tree', () => {
        const result = service.parseChangedFieldsFromOutcomeTree(mainOutcome);
        expect(Object.keys(result)).toEqual(['firstChildOutcomeCase', 'secondChildOutcomeCase']);
        expect(Object.keys(result['firstChildOutcomeCase'])).toEqual(['firstChildOutcomeTask']);
        expect(Object.keys(result['firstChildOutcomeCase']['firstChildOutcomeTask']))
            .toEqual(['taskId', 'firstChildOutcome']);
        expect(result['firstChildOutcomeCase']['firstChildOutcomeTask']['firstChildOutcome']['value']['value'])
            .toEqual('firstChildOutcomeValue');
        expect(Object.keys(result['secondChildOutcomeCase'])).toEqual(['secondChildOutcomeTask']);
        expect(Object.keys(result['secondChildOutcomeCase']['secondChildOutcomeTask']))
            .toEqual(['taskId', 'secondChildOutcome']);
        expect(result['secondChildOutcomeCase']['secondChildOutcomeTask']['secondChildOutcome']['value']['value'])
            .toEqual('secondChildOutcomeValue');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
