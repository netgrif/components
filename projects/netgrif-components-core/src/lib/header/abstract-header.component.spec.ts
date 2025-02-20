import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatIconModule} from '@angular/material/icon';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';
import {Component, Inject, Injector, Optional} from '@angular/core';
import {AbstractHeaderComponent} from './abstract-header.component';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {RouterTestingModule} from '@angular/router/testing';
import {SnackBarModule} from '../snack-bar/snack-bar.module';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {AuthenticationService} from '../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../resources/engine-endpoint/user-resource.service';
import {MockAuthenticationService} from '../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {ViewService} from '../routing/view-service/view.service';
import {TestViewService} from '../utility/tests/test-view-service';
import {ErrorSnackBarComponent} from '../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {MaterialModule} from '../material/material.module';
import {CaseHeaderService} from './case-header/case-header.service';
import {HeaderSearchService} from '../search/header-search-service/header-search.service';
import {CategoryFactory} from '../search/category-factory/category-factory';
import {TranslateService} from '@ngx-translate/core';
import {OverflowService} from './services/overflow.service';
import {AllowedNetsService} from '../allowed-nets/services/allowed-nets.service';
import {TestNoAllowedNetsFactory} from '../utility/tests/test-factory-methods';
import {AllowedNetsServiceFactory} from '../allowed-nets/services/factory/allowed-nets-service-factory';
import {CaseViewService} from "../view/case-view/service/case-view-service";
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData
} from "../data-fields/models/data-field-portal-data-injection-token";
import {MultichoiceField} from "../data-fields/multichoice-field/models/multichoice-field";
import {EnumerationField} from "../data-fields/enumeration-field/models/enumeration-field";

describe('AbstractHeaderComponent', () => {
    let component: TestHeaderComponent;
    let fixture: ComponentFixture<TestHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MaterialModule,
                MatIconModule,
                RouterTestingModule.withRoutes([]),
                SnackBarModule
            ],
            providers: [
                CaseHeaderService,
                HeaderSearchService,
                CategoryFactory,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [TestHeaderComponent]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHeaderComponent);
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

@Component({
    selector: 'ncc-test-head',
    template: ''
})
class TestHeaderComponent extends AbstractHeaderComponent {
    constructor(protected _injector: Injector,
                protected _translate: TranslateService,
                @Optional() protected _overflowService: OverflowService,
                @Optional() protected _caseViewService: CaseViewService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<MultichoiceField | EnumerationField>) {
        super(_injector, _translate, _overflowService, _caseViewService, _dataFieldPortalData);
    }
}
