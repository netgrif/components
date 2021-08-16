import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchModeComponent} from './search-mode.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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
    MockUserResourceService, NAE_BASE_FILTER,
    SearchService, TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory,
    TestConfigurationService,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService
} from '@netgrif/application-engine';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';


describe('SearchModeComponent', () => {
    let component: SearchModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                FlexModule,
                FlexLayoutModule,
                MatSortModule,
                NoopAnimationsModule,
                MatSelectModule,
                MatFormFieldModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatSnackBarModule,
                HttpClientTestingModule,
                TranslateLibModule,
                MaterialModule,
                NgxMatDatetimePickerModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseViewService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                CaseHeaderService,
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [SearchModeComponent, TestWrapperComponent],
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
    template: '<nc-search-mode [headerService]="service"></nc-search-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
