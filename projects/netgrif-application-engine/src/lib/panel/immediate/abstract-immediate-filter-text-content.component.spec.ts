import {AbstractImmediateFilterTextContentComponent} from './abstract-immediate-filter-text-content.component';
import {Component, Inject} from '@angular/core';
import {FilterTextConfiguration, NAE_FILTER_TEXT} from './model/filter-text-injection-token';
import {SearchService} from '../../search/search-service/search.service';
import {TranslateService} from '@ngx-translate/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

describe('AbstractImmediateFilterTextContentComponent', () => {
    let component: TestImmediateFilterTextContentComponent;
    let fixture: ComponentFixture<TestImmediateFilterTextContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
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
