import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CaseListComponent} from './case-list.component';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    AuthenticationMethodService,
    CaseResourceService,
    CaseViewService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService, NAE_BASE_FILTER,
    SearchService,
    TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {PanelComponentModule} from '../../../../panel/panel.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';


describe('CaseListComponent', () => {
    let component: CaseListComponent;
    let fixture: ComponentFixture<CaseListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                PanelComponentModule,
                NoopAnimationsModule,
                RouterModule.forRoot([]),
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: CaseResourceService, useClass: MyResources},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                CaseViewService,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [CaseListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseListComponent);
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

class MyResources {
    searchCases(filter, params) {
        return of({
            content: [], pagination: {
                number: -1,
                size: 0,
                totalPages: 0,
                totalElements: 0
            }
        });
    }
}
