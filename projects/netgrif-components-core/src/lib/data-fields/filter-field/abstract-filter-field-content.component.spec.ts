import {AbstractFilterFieldContentComponent} from './abstract-filter-field-content.component';
import {Component, Inject} from '@angular/core';
import {FilterField} from './models/filter-field';
import {SearchService} from '../../search/search-service/search.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NAE_FILTER_FIELD} from './models/filter-field-injection-token';
import {Subject} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FieldTypeResource} from "../../task-content/model/field-type-resource";

describe('AbstractFilterFieldContentComponent', () => {
    let component: TestFilterContentComponent;
    let fixture: ComponentFixture<TestFilterContentComponent>;

    let field: FilterField;
    let mockSearchService;

    beforeEach(() => {
        field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');

        mockSearchService = {
            loadFromPfql: () => {},
            loadingFromPfql$: new Subject<boolean>()
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
        mockSearchService.loadingFromPfql$.complete();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should finish loading', () => {
        expect(component).toBeTruthy();
        expect(component.filterLoaded).toBeFalse();
        mockSearchService.loadingFromPfql$.next(false);
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
