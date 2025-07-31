import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
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
} from '@netgrif/components-core';
import {CaseListPaginatorComponent} from './case-list-paginator.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PanelComponentModule} from '../../../../panel/panel.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

describe('CaseListPaginatorComponent', () => {
    let component: CaseListPaginatorComponent;
    let fixture: ComponentFixture<CaseListPaginatorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                PanelComponentModule,
                NoopAnimationsModule,
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
                {
                    provide: AllowedNetsService,
                    useFactory: TestCaseViewAllowedNetsFactory,
                    deps: [AllowedNetsServiceFactory]
                }
            ],
            declarations: [CaseListPaginatorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseListPaginatorComponent);
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
