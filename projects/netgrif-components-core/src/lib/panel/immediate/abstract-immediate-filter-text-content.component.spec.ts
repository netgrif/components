import {AbstractImmediateFilterTextContentComponent} from './abstract-immediate-filter-text-content.component';
import {Component, Inject} from '@angular/core';
import {FilterTextConfiguration, NAE_FILTER_TEXT} from './model/filter-text-injection-token';
import {SearchService} from '../../search/search-service/search.service';
import {TranslateService} from '@ngx-translate/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FilterType} from '../../filter/models/filter-type';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {NAE_BASE_FILTER} from '../../search/models/base-filter-injection-token';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AbstractImmediateFilterTextContentComponent', () => {
    let component: TestImmediateFilterTextContentComponent;
    let fixture: ComponentFixture<TestImmediateFilterTextContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
            ],
            providers: [
                {provide: NAE_FILTER_TEXT,
                    useValue: {metadata: {allowedNets: [], filterMetadata: {
                                filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []}
                        }, ellipsis: true}
                },
                SearchService,
                {provide: NAE_BASE_FILTER, useValue: {filter: SimpleFilter.emptyCaseFilter()}},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestImmediateFilterTextContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestImmediateFilterTextContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-immediate-filter-text-content',
    template: ''
})
class TestImmediateFilterTextContentComponent extends AbstractImmediateFilterTextContentComponent {
    constructor(@Inject(NAE_FILTER_TEXT) configuration: FilterTextConfiguration,
                textSearchService: SearchService,
                translateService: TranslateService) {
        super(configuration, textSearchService, translateService);
    }
}
