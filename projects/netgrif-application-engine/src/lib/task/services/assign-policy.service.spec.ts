import {TestBed} from '@angular/core/testing';
import {AssignPolicyService} from './assign-policy.service';
import {TaskDataService} from './task-data.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskRequestStateService} from './task-request-state.service';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MaterialModule} from '../../material/material.module';
import {DataFocusPolicyService} from './data-focus-policy.service';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {NAE_TASK_OPERATIONS} from '../models/task-operations-injection-token';
import {NullTaskOperations} from '../models/null-task-operations';
import {AssignTaskService} from './assign-task.service';
import {CancelTaskService} from './cancel-task.service';
import {TaskEventService} from '../../task-content/services/task-event.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {FinishPolicyService} from './finish-policy.service';
import {FinishTaskService} from './finish-task.service';
import {SingleTaskContentService} from '../../task-content/services/single-task-content.service';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {ChangedFieldsService} from '../../changed-fields/services/changed-fields.service';

describe('AssignPolicyService', () => {
    let service: AssignPolicyService;
    let assignSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                TranslateModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MaterialModule,
            ],
            providers: [
                AssignPolicyService,
                TaskDataService,
                TaskRequestStateService,
                DataFocusPolicyService,
                SingleTaskContentService,
                AssignTaskService,
                CancelTaskService,
                TaskEventService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                FinishPolicyService,
                FinishTaskService,
                ChangedFieldsService,
                {provide: TaskContentService, useClass: SingleTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations}
            ]
        });
        service = TestBed.inject(AssignPolicyService);
        TestBed.inject(TaskContentService).task = {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.auto,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                cols: undefined,
                rows: undefined,
                offset: 0
            },
            dataGroups: [],
            users: {},
            _links: {}
        };

        assignSpy = spyOn(TestBed.inject(AssignTaskService), 'assign').and.callThrough();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should performAssignPolicy', () => {
        service.performAssignPolicy(true);
        expect(assignSpy).toHaveBeenCalled();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
