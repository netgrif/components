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
import {TestCaseBaseFilterProvider, TestNoAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {UserFiltersService} from '../../filter/user-filters.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {NAE_SEARCH_CATEGORIES} from '../category-factory/search-categories-injection-token';
import {Category} from '../models/category/category';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {defaultCaseSearchCategoriesFactory} from '../category-factory/default-categories-factories';
import {CategoryFactory} from '../category-factory/category-factory';
import {NAE_FILTERS_FILTER} from '../../filter/models/filters-filter-injection-token';
import {Filter} from '../../filter/models/filter';
import {ViewIdService} from '../../user/services/view-id.service';
import {NAE_FILTER_TEXT} from '../../panel/immediate/model/filter-text-injection-token';
import {FilterType} from '../../filter/models/filter-type';

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
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
                CategoryFactory,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: NAE_SEARCH_COMPONENT_CONFIGURATION, useValue: {showSearchIcon: false}},
                {provide: ViewIdService, useValue: {viewId: 'test_view_id'}}
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
                userFilterService: UserFiltersService,
                allowedNetsService: AllowedNetsService,
                viewIdService: ViewIdService,
                @Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Category<any>>,
                @Optional() @Inject(NAE_SEARCH_COMPONENT_CONFIGURATION) configuration: SearchComponentConfiguration,
                @Optional() @Inject(NAE_FILTERS_FILTER) filtersFilter: Filter) {
        super(searchService, logger, dialogService, translate, userFilterService, allowedNetsService, viewIdService,
            searchCategories, configuration, filtersFilter);
    }
}
