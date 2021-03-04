import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractSearchComponent} from './abstract-search.component';
import {SearchService} from '../search-service/search.service';
import {LoggerService} from '../../logger/services/logger.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {TestCaseSearchServiceFactory} from '../../utility/tests/test-factory-methods';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '../../dialog/services/dialog.service';
import {NAE_SEARCH_COMPONENT_CONFIGURATION} from '../models/component-configuration/search-component-configuration-injection-token';
import {SearchComponentConfiguration} from '../models/component-configuration/search-component-configuration';

describe('AbstractSearchComponent', () => {
    let component: TestSearchComponent;
    let fixture: ComponentFixture<TestSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: SearchService, useFactory: TestCaseSearchServiceFactory},
                {provide: NAE_SEARCH_COMPONENT_CONFIGURATION, useValue: {showSearchIcon: false}}
            ],
            declarations: [
                TestSearchComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('injection token configuration can override values', () => {
        expect(component.showSearchToggleButton).toBeTrue();
        expect(component.showSearchIcon).toBeFalse();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});


@Component({
    selector: 'nae-test-search',
    template: ''
})
class TestSearchComponent extends AbstractSearchComponent {
    constructor(searchService: SearchService,
                logger: LoggerService,
                dialogService: DialogService,
                translate: TranslateService,
                @Optional() @Inject(NAE_SEARCH_COMPONENT_CONFIGURATION) configuration: SearchComponentConfiguration) {
        super(searchService, logger, dialogService, translate, configuration);
    }
}
