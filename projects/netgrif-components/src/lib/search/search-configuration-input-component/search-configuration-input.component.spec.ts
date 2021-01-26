import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchConfigurationInputComponent} from './search-configuration-input.component';
import {Component} from '@angular/core';
import {SearchComponentModule} from '../search.module';
import {
    AuthenticationMethodService,
    CaseTitle, CaseViewService,
    Category,
    CategoryFactory, ConfigCaseViewServiceFactory,
    ConfigurationInput,
    ConfigurationService, MockAuthenticationMethodService,
    SearchInputType, SearchService, TestCaseSearchServiceFactory, TestCaseViewFactory,
    TestConfigurationService
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchConfigurationInputComponent', () => {
    let component: SearchConfigurationInputComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestWrapperComponent
            ],
            providers: [
                CategoryFactory,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {
                    provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [ConfigCaseViewServiceFactory]
                },
                ConfigCaseViewServiceFactory,
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
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
