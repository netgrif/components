import {AbstractImmediateFilterTextComponent} from './abstract-immediate-filter-text.component';
import {Component, Inject, Injector} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FilterType} from '../../filter/models/filter-type';
import {ComponentType} from '@angular/cdk/portal';
import {AbstractImmediateFilterTextContentComponent} from './abstract-immediate-filter-text-content.component';
import {FilterTextConfiguration, NAE_FILTER_TEXT} from './model/filter-text-injection-token';
import {SearchService} from '../../search/search-service/search.service';
import {TranslateService} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractImmediateFilterTextComponent', () => {
    let component: TestImmediateFilterTextComponent;
    let fixture: ComponentFixture<TestImmediateFilterTextComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule, HttpClientTestingModule
            ],
            declarations: [TestImmediateFilterTextComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestImmediateFilterTextComponent);
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
    selector: 'nae-test-immediate-filter-text',
    template: ''
})
class TestImmediateFilterTextComponent extends AbstractImmediateFilterTextComponent {
    constructor(parenInjector: Injector) {
        super(parenInjector);
        this.ellipsis = true;
        this.filterMetadata = {allowedNets: [], filterMetadata: {filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []}};
    }

    protected getFilterTextContentComponent(): ComponentType<AbstractImmediateFilterTextContentComponent> {
        return PortalContentComponent;
    }
}

@Component({
    selector: 'nae-portal-content-component',
    template: ''
})
class PortalContentComponent extends AbstractImmediateFilterTextContentComponent {
    constructor(@Inject(NAE_FILTER_TEXT) configuration: FilterTextConfiguration,
                textSearchService: SearchService,
                translateService: TranslateService) {
        super(configuration, textSearchService, translateService);
    }
}
