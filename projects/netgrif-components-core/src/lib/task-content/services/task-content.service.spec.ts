import {TestBed} from '@angular/core/testing';
import {TaskContentService} from './task-content.service';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SingleTaskContentService} from './single-task-content.service';
import {createMockTask} from '../../utility/tests/utility/create-mock-task';
import {createMockDataGroup} from '../../utility/tests/utility/create-mock-datagroup';
import {createMockField} from '../../utility/tests/utility/create-mock-field';
import {TaskFields} from "../model/task-fields";

describe('TaskPanelContentService', () => {
    const FIELD_ID = 'field1';
    const TRANS_ID = 't1';

    let service: TaskContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                {provide: TaskContentService, useClass: SingleTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(TaskContentService);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // NAE-1413
    it('should process changed behavior correctly', () => {
        expect(service).toBeTruthy();

        const mockTask = createMockTask('id', '', TRANS_ID);
        mockTask.dataGroups = [createMockDataGroup([
            createMockField(undefined, undefined, FIELD_ID)
        ])];
        mockTask.dataGroups[0].fields[0].behavior = {
            visible: true,
            required: true
        };

        // normally task fields index is created during processing of getData response
        service.taskFieldsIndex[mockTask.stringId] = {} as TaskFields;
        service.taskFieldsIndex[mockTask.stringId].fields[FIELD_ID] = mockTask.dataGroups[0].fields[0];
        service.task = mockTask;

        service.updateFromChangedFields({
            [FIELD_ID]: {
                behavior: {
                    [TRANS_ID]: {
                        editable: true
                    }
                }
            },
            taskId: mockTask.stringId
        });

        // expectation testov bude nutne zmenit po opraveny bugu s vyhodnocovanim behavior NGSD-489
        expect(service.task.dataGroups[0].fields[0].behavior).toEqual({
            editable: true
        });

        service.updateFromChangedFields({
            [FIELD_ID + '2']: {
                behavior: {
                    [TRANS_ID]: {
                        visible: true
                    }
                }
            },
            taskId: mockTask.stringId
        });

        expect(service.task.dataGroups[0].fields[0].behavior).toEqual({
            editable: true
        });

        service.updateFromChangedFields({
            [FIELD_ID]: {
                behavior: {
                    [TRANS_ID + '2']: {
                        visible: true
                    }
                }
            },
            taskId: mockTask.stringId
        });

        expect(service.task.dataGroups[0].fields[0].behavior).toEqual({
            editable: true
        });
    });
});
