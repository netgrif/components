import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {TaskViewService} from './task-view.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {Observable, of} from 'rxjs';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {SearchService} from '../../../search/search-service/search.service';
import {TestTaskBaseFilterProvider, TestTaskViewAllowedNetsFactory} from '../../../utility/tests/test-factory-methods';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {ErrorSnackBarComponent} from '../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {WarningSnackBarComponent} from '../../../snack-bar/components/warning-snack-bar/warning-snack-bar.component';
import {Task} from '../../../resources/interface/task';
import {delay, tap} from 'rxjs/operators';
import {createMockTask} from '../../../utility/tests/utility/create-mock-task';
import {ElementaryPredicate} from '../../../search/models/predicate/elementary-predicate';
import {Query} from '../../../search/models/query/query';
import {Page} from '../../../resources/interface/page';
import {TaskPanelData} from '../../../panel/task-panel-list/task-panel-data/task-panel-data';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {NAE_BASE_FILTER} from '../../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../../allowed-nets/services/factory/allowed-nets-service-factory';

describe('TaskViewService', () => {
    let service: TaskViewService;
    let taskService: MyResources;
    let searchService: SearchService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule,
                SnackBarModule
            ],
            providers: [
                TaskViewService,
                {provide: TaskResourceService, useClass: MyResources},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: []
        });
        service = TestBed.inject(TaskViewService);
        searchService = TestBed.inject(SearchService);
        taskService = TestBed.inject(TaskResourceService) as unknown as MyResources;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('should load tasks', done => {
    //     taskService.setResponse(1000, [createMockTask('task')]);
    //     let c = 0;
    //     service.tasks$.subscribe(receivedTasks => {
    //         expect(receivedTasks).toBeTruthy();
    //         expect(Array.isArray(receivedTasks)).toBeTrue();
    //         if (c === 1) {
    //             expect(receivedTasks.length).toEqual(1);
    //             expect(receivedTasks[0].task.stringId).toEqual('task');
    //         }
    //         c++;
    //         done();
    //     });
    // });

    // NAE-968
    it('should process second filter change before first filter call returns', fakeAsync(() => {
        let tasks: Array<TaskPanelData>;

        service.tasks$.subscribe(receivedTasks => {
            tasks = receivedTasks;
        });

        let received1 = false;
        taskService.setResponse(3000, [createMockTask('mock')], () => {
            received1 = true;
        });

        let oldActiveFilter = searchService.activeFilter;
        searchService.addPredicate(new ElementaryPredicate(new Query('q1')));
        expect(oldActiveFilter !== searchService.activeFilter).toBeTrue();

        tick(400);
        expect(service.loading).toBeTrue();

        let received2 = false;
        taskService.setResponse(600, [createMockTask('mock1'), createMockTask('mock2')], () => {
            received2 = true;
        });

        oldActiveFilter = searchService.activeFilter;
        searchService.addPredicate(new ElementaryPredicate(new Query('q2')));
        expect(oldActiveFilter !== searchService.activeFilter).toBeTrue();

        tick(1000);
        expect(service.loading).toBeTrue();

        tick(5000);
        expect(service.loading).toBeFalse();
        expect(received1).toBeTrue();
        expect(received2).toBeTrue();
        expect(tasks).toBeTruthy();
        expect(Array.isArray(tasks)).toBeTrue();
        expect(tasks.length).toEqual(2);
        expect(tasks[0].task.stringId).toEqual('mock1');
        expect(tasks[1].task.stringId).toEqual('mock2');
    }));

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class MyResources {

    private delay = 0;
    private result: Array<Task> = [];
    private callback: () => void = () => {};

    setResponse(_delay: number, tasks: Array<Task>, callback: () => void = () => {}) {
        this.delay = _delay;
        this.result = tasks;
        this.callback = callback;
    }

    private returnResponse(): Observable<Page<Task>> {
        const callback = this.callback;
        const content = [...this.result];
        return of({
            content,
            pagination: {
                size: content.length,
                totalElements: content.length,
                totalPages: 1,
                number: 0
            }
        }).pipe(delay(this.delay),
            tap(() => {
                callback();
            })
        );
    }

    searchTask(): Observable<Page<Task>> {
        return this.returnResponse();
    }

    getTasks(): Observable<Page<Task>> {
        return this.returnResponse();
    }
}
