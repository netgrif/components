import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterFieldTabbedCaseViewComponent } from './filter-field-tabbed-case-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    AuthenticationMethodService,
    CaseHeaderService,
    ConfigurationService, createMockNet, MaterialModule, MockAuthenticationMethodService, MockUserService,
    NAE_BASE_FILTER, NAE_TAB_DATA, ProcessService,
    SearchService, SimpleFilter,
    TestConfigurationService, TestNoAllowedNetsFactory, TranslateLibModule, User, UserService,
    TestMockDependenciesModule,
    AbstractHeaderService,
    UserPreferenceService,
    MockUserPreferenceService,
    OverflowService,
    AuthenticationService,
    UserResourceService,
    MockAuthenticationService,
    MockUserResourceService,
    CaseViewService,
    ViewService,
    TestViewService,
    NAE_VIEW_ID_SEGMENT
} from '@netgrif/components-core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { NavigationComponentModule } from '../../navigation/navigation.module';
import { HeaderComponent } from '../../header/header.component';

describe('FilterFieldTabbedCaseViewComponent', () => {
    let component: FilterFieldTabbedCaseViewComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TestWrapperComponent, FilterFieldTabbedCaseViewComponent, HeaderComponent],
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                NoopAnimationsModule,
                TranslateLibModule,
                NavigationComponentModule,
                TestMockDependenciesModule
            ],
            providers: [
                {provide: NAE_VIEW_ID_SEGMENT, useValue: 'id'},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: UserService, useClass: CustomMockUserService},
                SearchService,
                {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyCaseFilter()}},
                {
                    provide: ProcessService,
                    useClass: MockProcessService
                },
                {provide: NAE_TAB_DATA, useValue: {tabViewComponent: undefined, tabViewOrder: 1}},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: CaseViewService, useValue: {allowedNets$: of([])}},
                {provide: ViewService, useClass: TestViewService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                OverflowService,
                {provide: UserPreferenceService, useClass: MockUserPreferenceService},
                {provide: AbstractHeaderService, useClass: CaseHeaderService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-filter-field-tabbed-case-view></nc-filter-field-tabbed-case-view>'
})
class TestWrapperComponent {
    constructor() {
    }

}

@Injectable()
class CustomMockUserService extends MockUserService {
    constructor() {
        super();
        this._user = new User('123', 'test@netgrif.com', 'Test', 'User', ['ROLE_USER'], [{
            stringId: 'id',
            name: 'id',
            description: '',
            importId: 'id',
            netImportId: 'identifier',
            netVersion: '1.0.0',
            netStringId: 'stringId',
        }]);
    }
}

@Injectable()
class MockProcessService {

    public getNets() {
        return of([createMockNet(
            'stringId',
            'identifier',
            'title',
            [{
                stringId: 'id',
                name: 'id'
            }], [], [], {
                id: {
                    create: true
                }
            }
        )]);
    }
}
