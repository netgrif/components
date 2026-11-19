import {AbstractFilterFieldComponent} from './abstract-filter-field.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {FilterField} from './models/filter-field';
import {Subject} from 'rxjs';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {FieldTypeResource} from '../../task-content/model/field-type-resource';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractFilterFieldComponent', () => {
    let component: TestFilterComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    let mockSearchService;

    beforeEach(() => {
        mockSearchService = {
            loadFromPfql: () => {},
            loadingFromPfql$: new Subject<boolean>()
        };

        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent, TestFilterComponent],
            imports: [],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestFilterComponent extends AbstractFilterFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-filter [dataField]="field"></ncc-test-filter>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');
}
