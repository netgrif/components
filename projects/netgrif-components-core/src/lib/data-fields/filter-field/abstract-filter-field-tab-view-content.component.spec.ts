import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractFilterFieldTabViewContentComponent } from './abstract-filter-field-tab-view-content.component';
import { Component, Inject, Injector, Optional } from '@angular/core';
import { FilterField } from './models/filter-field';
import { NAE_FILTER_FIELD } from './models/filter-field-injection-token';
import { SearchService } from '../../search/search-service/search.service';
import { Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Dashboard } from '../text-field/dashboard-portal-text-field/dashboard-view-constants';
import { ComponentPortal } from '@angular/cdk/portal';
import {ComponentRegistryService} from "../../registry/component-registry.service";
import {FieldTypeResource} from "../../task-content/model/field-type-resource";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";

describe('AbstractFilterFieldTabViewContentComponent', () => {
    let component: TestFilterFieldTabViewContentComponent;
    let fixture: ComponentFixture<TestFilterFieldTabViewContentComponent>;

    let field: FilterField;
    let mockSearchService;

    let registry: ComponentRegistryService;

    beforeEach(async () => {
        field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');

        mockSearchService = {
            loadFromPfql: () => {},
            loadingFromPfql$: new Subject<boolean>()
        };

        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            providers: [
                { provide: NAE_FILTER_FIELD, useValue: field },
                { provide: SearchService, useValue: mockSearchService }
            ],
            declarations: [
                TestFilterFieldTabViewContentComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFilterFieldTabViewContentComponent);
        component = fixture.componentInstance;
        registry = TestBed.inject(ComponentRegistryService);
        fixture.detectChanges();
    });

    afterEach(() => {
        mockSearchService.loadingFromPfql$.complete();
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create filter', () => {
        registry.register(Dashboard.FILTER_TAB_VIEW_ID, (injector: Injector) => new ComponentPortal(TestTabViewComponent, null, injector));
        component.createFilter();
        expect(component.componentPortal).toBeTruthy();
    });
});

@Component({
    selector: 'ncc-test-filter-tab-view-content',
    template: ''
})
class TestFilterFieldTabViewContentComponent extends AbstractFilterFieldTabViewContentComponent {
    constructor(registry: ComponentRegistryService,
                injector: Injector,
                @Inject(NAE_FILTER_FIELD) filterField: FilterField,
                searchService: SearchService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(registry, injector, filterField, searchService, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-tab-view',
    template: ''
})
class TestTabViewComponent {
}
