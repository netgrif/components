import {AbstractFilterFieldContentComponent} from './abstract-filter-field-content.component';
import {Component, Inject} from '@angular/core';
import {FilterField} from './models/filter-field';
import {SearchService} from '../../search/search-service/search.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NAE_FILTER_FIELD} from './models/filter-field-injection-token';
import {FilterType} from '../../filter/models/filter-type';
import {Subject} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractFilterFieldContentComponent', () => {
    let component: TestFilterContentComponent;
    let fixture: ComponentFixture<TestFilterContentComponent>;

    let field: FilterField;
    let mockSearchService;

    beforeEach(() => {
        field = new FilterField('', '', '', {
            filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
        }, [], {}, '', '');

        mockSearchService = {
            loadFromMetadata: () => {},
            loadingFromMetadata$: new Subject<boolean>()
        };

        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [
                {provide: NAE_FILTER_FIELD, useValue: field},
                {provide: SearchService, useValue: mockSearchService}
            ],
            declarations: [
                TestFilterContentComponent
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestFilterContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        mockSearchService.loadingFromMetadata$.complete();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should finish loading', () => {
        expect(component).toBeTruthy();
        expect(component.filterLoaded).toBeFalse();
        mockSearchService.loadingFromMetadata$.next(false);
        expect(component.filterLoaded).toBeTrue();
    });

    it('should get field behavior', () => {
        expect(component).toBeTruthy();
        expect(component.editable).toBeFalse();
        field.behavior.editable = true;
        expect(component.editable).toBeTrue();
    });
});


@Component({
    selector: 'ncc-test-filter-content',
    template: ''
})
class TestFilterContentComponent extends AbstractFilterFieldContentComponent {
    constructor(@Inject(NAE_FILTER_FIELD) filterField: FilterField,
                fieldSearchService: SearchService) {
        super(filterField, fieldSearchService);
    }
}
