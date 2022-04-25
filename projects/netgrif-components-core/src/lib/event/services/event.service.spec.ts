import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {createMockSetDataOutcome} from '../../utility/tests/utility/create-mock-set-data-outcome';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {createMockCase} from '../../utility/tests/utility/create-mock-case';
import {ChangedFieldsMap} from './interfaces/changed-fields-map';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('EventService', () => {
    let service: EventService;

    const secondChildOutcome = createMockSetDataOutcome({
        changedFields: {
            secondChildOutcome: {
                value: 'secondChildOutcomeValue',
                type: 'text'
            }
        }
    }, createMockTask('secondChildOutcomeTask'), undefined, createMockCase('secondChildOutcomeCase'));

    const firstChildOutcome = createMockSetDataOutcome({
        changedFields: {
            firstChildOutcome: {
                value: 'firstChildOutcomeValue',
                type: 'text'
            }
        }
    }, createMockTask('firstChildOutcomeTask'), undefined, createMockCase('firstChildOutcomeCase'), [secondChildOutcome]);

    const mainOutcome = createMockSetDataOutcome({
        changedFields: {
            shouldNotBeIncluded: {
                value: 'parentField',
                type: 'text'
            }
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
        expect(result['firstChildOutcomeCase']['firstChildOutcomeTask']['firstChildOutcome']['value'])
            .toEqual('firstChildOutcomeValue');
        expect(Object.keys(result['secondChildOutcomeCase'])).toEqual(['secondChildOutcomeTask']);
        expect(Object.keys(result['secondChildOutcomeCase']['secondChildOutcomeTask']))
            .toEqual(['taskId', 'secondChildOutcome']);
        expect(result['secondChildOutcomeCase']['secondChildOutcomeTask']['secondChildOutcome']['value'])
            .toEqual('secondChildOutcomeValue');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
