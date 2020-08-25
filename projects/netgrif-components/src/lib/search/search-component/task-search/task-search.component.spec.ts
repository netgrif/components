import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskSearchComponent} from './task-search.component';
import {SearchComponentModule} from '../../search.module';
import {
    ConfigTaskViewServiceFactory,
    UserResourceService,
    ConfigurationService,
    TestConfigurationService,
    SearchService,
    AuthenticationMethodService,
    AuthenticationService,
    MockAuthenticationService,
    MockUserResourceService,
    TestTaskSearchServiceFactory,
    TaskViewService,
    TestTaskViewFactory
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TaskSearchComponent', () => {
    let component: TaskSearchComponent;
    let fixture: ComponentFixture<TaskSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                ConfigTaskViewServiceFactory,
                AuthenticationMethodService,
                {
                    provide: SearchService,
                    useFactory: TestTaskSearchServiceFactory
                },
                {   provide: TaskViewService,
                    useFactory: TestTaskViewFactory,
                    deps: [ConfigTaskViewServiceFactory]},
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
});
