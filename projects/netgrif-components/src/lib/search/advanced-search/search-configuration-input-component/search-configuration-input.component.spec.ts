import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchConfigurationInputComponent} from './search-configuration-input.component';
import {Component} from '@angular/core';
import {
    AuthenticationMethodService,
    CaseTitle,
    Category,
    CategoryFactory,
    ConfigurationInput,
    ConfigurationService,
    MockAuthenticationMethodService,
    SearchInputType,
    SearchService,
    TestConfigurationService,
    NAE_BASE_FILTER,
    TestCaseBaseFilterProvider,
    AllowedNetsService,
    TestNoAllowedNetsFactory,
    AllowedNetsServiceFactory
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AdvancedSearchComponentModule} from '../advanced-search.module';

describe('SearchConfigurationInputComponent', () => {
    let component: SearchConfigurationInputComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                AdvancedSearchComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestWrapperComponent
            ],
            providers: [
                CategoryFactory,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
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
    selector: 'nc-test-wrapper',
    template: '<nc-search-configuration-input [configuration]="configuration" [selectedCategory]="category">' +
        '</nc-search-configuration-input>'
})
class TestWrapperComponent {

    public configuration: ConfigurationInput;

    public category: Category<unknown>;

    constructor(factory: CategoryFactory) {

        const options = new Map();
        options.set('a', ['a']);

        this.configuration = new ConfigurationInput(SearchInputType.OPERATOR, 'label', true, options, () => {
            return [{text: 'text', value: 'a'}];
        });

        this.category = factory.get(CaseTitle);
    }

}
