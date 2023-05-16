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
import {UserService} from '../../user/services/user.service';
import {MockUserService} from '../../utility/tests/mocks/mock-user.service';
import {User} from '../../user/models/user';
import {PermissionService} from '../../authorization/permission/permission.service';

describe('AssignPolicyService', () => {
    let service: AssignPolicyService;
    let assignSpy: jasmine.Spy;
    let userService: UserService;

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
                PermissionService,
                {provide: TaskContentService, useClass: SingleTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: NAE_TASK_OPERATIONS, useClass: NullTaskOperations},
                {provide: UserService, useClass: MockUserService}
            ]
        });
        userService = TestBed.inject(UserService);
        service = TestBed.inject(AssignPolicyService);
        TestBed.inject(TaskContentService).task = {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            userRefs: undefined,
            roles: {
                assignRole: {
                    assign: true
                }
            },
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.AUTO,
            dataFocusPolicy: DataFocusPolicy.MANUAL,
            finishPolicy: FinishPolicy.MANUAL,
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
        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [], [{stringId: 'assignRole', name: '', importId: ''}]);
        service.performAssignPolicy(true);
        expect(assignSpy).toHaveBeenCalled();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        assignSpy.calls.reset();
    });
});
