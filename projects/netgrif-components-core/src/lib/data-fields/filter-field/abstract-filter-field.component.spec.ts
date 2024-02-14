import {AbstractFilterFieldComponent} from './abstract-filter-field.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Inject, Optional} from '@angular/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {FilterField} from './models/filter-field';
import {FilterType} from '../../filter/models/filter-type';
import {of, Subject} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractFilterFieldComponent', () => {
    let component: TestFilterComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    let mockSearchService;

    beforeEach(() => {
        mockSearchService = {
            loadFromMetadata: () => {},
            loadingFromMetadata$: new Subject<boolean>()
        };

        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            declarations: [
                TestWrapperComponent,
                TestFilterComponent,

            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'ncc-test-filter',
    template: ''
})
class TestFilterComponent extends AbstractFilterFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-filter [dataField]="field"></ncc-test-filter>'
})
class TestWrapperComponent {
    field = new FilterField('', '', '', {
        filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
    }, [], {}, '', '');
}
