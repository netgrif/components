import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigCaseViewServiceFactory} from '../../../view/case-view/service/factory/config-case-view-service-factory';
import {CategoryFactory} from '../../category-factory/category-factory';
import {SearchService} from '../../search-service/search.service';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../../view/case-view/service/case-view-service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {Component} from '@angular/core';
import {AbstractCaseSearchComponent} from './abstract-case-search.component';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';

describe('AbstractCaseSearchComponent', () => {
    let component: TestCaseSearchComponent;
    let fixture: ComponentFixture<TestCaseSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                SnackBarModule,
                TranslateLibModule
            ],
            providers: [
                ConfigCaseViewServiceFactory,
                CategoryFactory,
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {   provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [ConfigCaseViewServiceFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
            ],
            declarations: [TestCaseSearchComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCaseSearchComponent);
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
    selector: 'nae-test-panel',
    template: ''
})
class TestCaseSearchComponent extends AbstractCaseSearchComponent {
    constructor(protected _categoryFactory: CategoryFactory) {
        super(_categoryFactory);
    }
}
