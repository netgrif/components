import {waitForAsync, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
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
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '../../dialog/services/dialog.service';
import {NAE_SEARCH_COMPONENT_CONFIGURATION} from '../models/component-configuration/search-component-configuration-injection-token';
import {SearchComponentConfiguration} from '../models/component-configuration/search-component-configuration';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {NAE_SAVE_FILTER_COMPONENT} from '../../side-menu/content-components/injection-tokens';
import {ComponentType} from '@angular/cdk/portal';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {TestCaseBaseFilterProvider} from '../../utility/tests/test-factory-methods';

describe('AbstractSearchComponent', () => {
    let component: TestSearchComponent;
    let fixture: ComponentFixture<TestSearchComponent>;
    let searchService: SearchService;

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
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
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
        searchService = TestBed.inject(SearchService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('injection token configuration can override values', () => {
        expect(component.showSearchToggleButton).toBeTrue();
        expect(component.showSearchIcon).toBeFalse();
    });

    // NAE-1243
    it('should set and clear fulltext search', fakeAsync(() => {
        const fc = component.fullTextFormControl;
        expect(fc).toBeTruthy();
        const spySet = spyOn(searchService, 'setFullTextFilter');
        const spyClear = spyOn(searchService, 'clearFullTextFilter');
        fc.setValue('hello world');
        tick(600);
        expect(spySet).toHaveBeenCalled();
        fc.setValue('');
        tick(600);
        expect(spyClear).toHaveBeenCalled();
    }));

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
                sideMenuService: SideMenuService,
                @Optional() @Inject(NAE_SEARCH_COMPONENT_CONFIGURATION) configuration: SearchComponentConfiguration,
                @Optional() @Inject(NAE_SAVE_FILTER_COMPONENT) sideMenuComponent: ComponentType<unknown>) {
        super(searchService, logger, dialogService, translate, sideMenuService, configuration, sideMenuComponent);
    }
}
