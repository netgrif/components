import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskSearchComponent} from './task-search.component';
import {SearchComponentModule} from '../../search.module';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SearchService,
    TestConfigurationService,
    UserResourceService,
    NAE_BASE_FILTER,
    TestTaskBaseFilterProvider,
    AllowedNetsService,
    TestNoAllowedNetsFactory,
    AllowedNetsServiceFactory,
    ViewIdService
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TaskSearchComponent', () => {
    let component: TaskSearchComponent;
    let fixture: ComponentFixture<TaskSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchComponentModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestTaskBaseFilterProvider
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                {provide: ViewIdService, useValue: {viewId: 'test_view_id'}},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
