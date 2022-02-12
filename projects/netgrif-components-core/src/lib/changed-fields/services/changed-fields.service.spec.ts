import {TestBed} from '@angular/core/testing';

import {ChangedFieldsService} from './changed-fields.service';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ChangedFieldsMap} from '../../event/services/interfaces/changed-fields-map';

describe('ChangedFieldsService', () => {
    let service: ChangedFieldsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            providers: [
                ChangedFieldsService
            ]
        });
        service = TestBed.inject(ChangedFieldsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit changed fields', (done) => {
        const changedFieldsMap: ChangedFieldsMap = {
            caseId: {
                taskId: {
                    testField: {
                        type: 'text',
                        value: 'test'
                    },
                    taskId: 'testTaskId'
                }
            }
        };
        service.changedFields$.subscribe((changedFields: ChangedFieldsMap) => {
            expect(changedFields).toBeTruthy();
            expect(Object.keys(changedFields)).toContain('caseId');
            expect(Object.keys(changedFields['caseId'])).toContain('taskId');
            expect(Object.keys(changedFields['caseId']['taskId'])).toContain('testField');
            expect(changedFields['caseId']['taskId'].taskId).toContain('testTaskId');
            expect(Object.keys(changedFields['caseId']['taskId']['testField'])).toContain('type');
            expect(Object.keys(changedFields['caseId']['taskId']['testField'])).toContain('value');
            expect(changedFields['caseId']['taskId'].taskId).toEqual('testTaskId');
            expect(changedFields['caseId']['taskId']['testField']['type']).toEqual('text');
            expect(changedFields['caseId']['taskId']['testField']['value']).toEqual('test');
            done();
        });
        service.emitChangedFields(changedFieldsMap);
    });

    it('should parse changed fields by task', () => {
        const task = createMockTask();
        const changedFieldsMap: ChangedFieldsMap = {
            string: {
                stringId: {
                    testField: {
                        type: 'text',
                        value: 'test'
                    },
                    taskId: 'testTaskId'
                }
            }
        };
        const changedFields: ChangedFields = service.parseChangedFieldsByCaseAndTaskIds('string', [task.stringId], changedFieldsMap)[0];
        expect(changedFields).toBeDefined();
        expect(Object.keys(changedFields)).toContain('testField');
        expect(Object.keys(changedFields['testField'])).toContain('value');
        expect(Object.keys(changedFields['testField'])).toContain('type');
        expect(changedFields.taskId).toEqual('testTaskId');
        expect(changedFields['testField']['type']).toEqual('text');
        expect(changedFields['testField']['value']).toEqual('test');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
