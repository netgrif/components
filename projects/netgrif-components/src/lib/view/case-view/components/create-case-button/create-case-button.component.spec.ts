import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CreateCaseButtonComponent} from './create-case-button.component';
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
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {PanelComponentModule} from '../../../../panel/panel.module';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('CreateCaseButtonComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule,
                PanelComponentModule,
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
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {

        expect(component).toBeTruthy();
        expect(component.newCaseCreationConfig).toBeTruthy();

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


@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-create-case-button [newCaseCreationConfig]="newCaseCreationConfig"></nc-create-case-button>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    newCaseCreationConfig = {
        enableCaseTitle: true,
        isCaseTitleRequired: true,
        newCaseButtonConfig: {createCaseButtonTitle: 'title', createCaseButtonIcon: 'home'}
    };
}
