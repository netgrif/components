import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractFilterFieldTabViewComponent } from './abstract-filter-field-tab-view.component';
import { FilterField } from './models/filter-field';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NAE_FILTER_FIELD } from './models/filter-field-injection-token';
import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import {ComponentRegistryService} from "../../registry/component-registry.service";
import {FieldTypeResource} from "../../task-content/model/field-type-resource";
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
describe('AbstractFilterFieldTabViewComponent', () => {
    let component: TestFilterFieldTabViewComponent;
    let fixture: ComponentFixture<TestFilterFieldTabViewComponent>;

    let field: FilterField;

    beforeEach(async () => {
        field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');

        await TestBed.configureTestingModule({
            declarations: [TestFilterFieldTabViewComponent],
            imports: [],
            providers: [
                { provide: NAE_FILTER_FIELD, useValue: field },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFilterFieldTabViewComponent);
        component = fixture.componentInstance;
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
    selector: 'ncc-test-filter-tab-view',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestFilterFieldTabViewComponent extends AbstractFilterFieldTabViewComponent {
    constructor(registry: ComponentRegistryService,
                @Inject(NAE_FILTER_FIELD) filterField: FilterField) {
        super(registry, filterField, TestCaseViewComponent, TestTaskViewComponent);
    }
}

@Component({
    selector: 'ncc-test',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestCaseViewComponent  {
    constructor() {
    }
}

@Component({
    selector: 'ncc-test',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestTaskViewComponent  {
    constructor() {
    }
}
