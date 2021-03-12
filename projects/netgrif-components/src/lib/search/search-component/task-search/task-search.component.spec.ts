import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskSearchComponent} from './task-search.component';
import {SearchComponentModule} from '../../search.module';
import {
    AuthenticationMethodService,
    AuthenticationService,
    TaskViewServiceFactory,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SearchService,
    TaskViewService,
    TestConfigurationService,
    TestTaskViewFactory,
    UserResourceService, NAE_BASE_FILTER, TestTaskBaseFilterProvider
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TaskSearchComponent', () => {
    let component: TaskSearchComponent;
    let fixture: ComponentFixture<TaskSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                TaskViewServiceFactory,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {
                    provide: TaskViewService,
                    useFactory: TestTaskViewFactory,
                    deps: [TaskViewServiceFactory]
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
