import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchModeComponent} from './search-mode.component';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    AuthenticationMethodService,
    AuthenticationService,
    CaseHeaderService,
    CaseViewService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NAE_BASE_FILTER,
    OverflowService,
    SearchService,
    TestCaseBaseFilterProvider,
    TestCaseViewAllowedNetsFactory,
    TestConfigurationService,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService
} from '@netgrif/components-core';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('SearchModeComponent', () => {
    let component: SearchModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchModeComponent, TestWrapperComponent],
            imports: [
                MatInputModule,
                FlexModule,
                FlexLayoutModule,
                MatSortModule,
                MatSelectModule,
                MatFormFieldModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSnackBarModule,
                TranslateLibModule,
                MaterialModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseViewService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                OverflowService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                CaseHeaderService,
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-search-mode [headerService]="service"></nc-search-mode>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
