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
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PanelComponentModule} from '../../../../panel/panel.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {Component} from '@angular/core';


describe('CreateCaseButtonComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

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
                {
                    provide: AllowedNetsService,
                    useFactory: TestCaseViewAllowedNetsFactory,
                    deps: [AllowedNetsServiceFactory]
                }
            ],
            declarations: [TestWrapperComponent]
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
    selector: 'ncc-test-wrapper',
    template: '<nc-create-case-button [newCaseCreationConfig]="newCaseCreationConfig"></nc-create-case-button>'
})
class TestWrapperComponent {
    newCaseCreationConfig = {
        enableCaseTitle: true,
        isCaseTitleRequired: true,
        newCaseButtonConfig: {createCaseButtonTitle: 'title', createCaseButtonIcon: 'home'}
    };
}
