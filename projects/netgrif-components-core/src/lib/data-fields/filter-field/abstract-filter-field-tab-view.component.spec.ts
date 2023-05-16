import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractFilterFieldTabViewComponent } from './abstract-filter-field-tab-view.component';
import { FilterField } from './models/filter-field';
import { FilterType } from '../../filter/models/filter-type';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NAE_FILTER_FIELD } from './models/filter-field-injection-token';
import { Component, Inject } from '@angular/core';
import {
    DashboardPortalComponentRegistryService
} from '../text-field/dashboard-portal-text-field/dashboard-portal-component-registry.service';

describe('AbstractFilterFieldTabViewComponent', () => {
    let component: TestFilterFieldTabViewComponent;
    let fixture: ComponentFixture<TestFilterFieldTabViewComponent>;

    let field: FilterField;

    beforeEach(async () => {
        field = new FilterField('', '', '', {
            filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
        }, [], {}, '', '');

        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [
                { provide: NAE_FILTER_FIELD, useValue: field },
            ],
            declarations: [
                TestFilterFieldTabViewComponent
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
    template: ''
})
class TestFilterFieldTabViewComponent extends AbstractFilterFieldTabViewComponent {
    constructor(registry: DashboardPortalComponentRegistryService,
                @Inject(NAE_FILTER_FIELD) filterField: FilterField) {
        super(registry, filterField, TestCaseViewComponent, TestTaskViewComponent);
    }
}

@Component({
    selector: 'ncc-test',
    template: ''
})
class TestCaseViewComponent  {
    constructor() {
    }
}

@Component({
    selector: 'ncc-test',
    template: ''
})
class TestTaskViewComponent  {
    constructor() {
    }
}
