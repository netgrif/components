import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TaskViewService} from './task-view.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {of} from 'rxjs';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../panel/task-panel/policy';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';

describe('TaskViewService', () => {
    let service: TaskViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule],
            providers: [
                TaskViewService,
                {provide: TaskResourceService, useClass: MyResources},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                AuthenticationMethodService
            ]
        });
        service = TestBed.inject(TaskViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load tasks', () => {
        service.activeFilter = new SimpleFilter('id', FilterType.TASK, {});
        service.loadTasks();
        expect(service.taskArray.length).toEqual(1);
        service.reload();
        expect(service.taskArray.length).toEqual(1);
    });
});

class MyResources {
    searchTask(filter) {
        return of([{
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            cols: undefined,
            dataGroups: [],
            _links: {}
        }]);
    }
}
