import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatIconModule} from '@angular/material/icon';
import {of} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';
import {Component, Injector} from '@angular/core';
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
import {CaseViewService} from '../view/case-view/service/case-view-service';
import {ViewService} from '../routing/view-service/view.service';
import {TestViewService} from '../utility/tests/test-view-service';
import {ErrorSnackBarComponent} from '../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {MaterialModule} from '../material/material.module';
import {CaseHeaderService} from './case-header/case-header.service';
import {HeaderSearchService} from '../search/header-search-service/header-search.service';
import {CategoryFactory} from '../search/category-factory/category-factory';

describe('AbstractHeaderComponent', () => {
    let component: TestHeaderComponent;
    let fixture: ComponentFixture<TestHeaderComponent>;

    beforeEach(async(() => {
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
                {provide: CaseViewService, useValue: {allowedNets$: of([])}},
                {provide: ViewService, useClass: TestViewService},
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
    selector: 'nae-test-head',
    template: ''
})
class TestHeaderComponent extends AbstractHeaderComponent {
    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
