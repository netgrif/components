import {ComponentFixture, TestBed} from "@angular/core/testing";
import {of, Subject} from "rxjs";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {Component, Inject, Injector, Optional, ChangeDetectionStrategy} from "@angular/core";
import {ComponentType} from "@angular/cdk/portal";
import {AbstractFilterFieldContentComponent} from "../abstract-filter-field-content.component";
import {FilterField} from "../models/filter-field";
import {SearchService} from "../../../search/search-service/search.service";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractFilterDefaultFieldComponent} from "./abstract-filter-default-field.component";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {FieldTypeResource} from "../../../task-content/model/field-type-resource";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractFilterDefaultFieldComponent', () => {
    let component: TestFilterComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    let mockSearchService;

    beforeEach(() => {
        mockSearchService = {
            loadFromPfql: () => {},
            loadingFromPfql$: new Subject<boolean>()
        };

        TestBed.configureTestingModule({
            declarations: [
                TestWrapperComponent,
                TestFilterComponent,
                TestFilterContentComponent
            ],
            imports: [],
            providers: [
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', ''),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<FilterField>
                },
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
class TestFilterComponent extends AbstractFilterDefaultFieldComponent {
    constructor(parentInjector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(parentInjector, dataFieldPortalData);
    }

    protected getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent> {
        return TestFilterContentComponent;
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-filter></ncc-test-filter>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {

}

@Component({
    selector: 'ncc-test-filter-content',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestFilterContentComponent extends AbstractFilterFieldContentComponent {
    constructor() {
        super({} as FilterField, {
            loadFromMetadata: () => {
            },
            loadingFromMetadata$: of(false)
        } as unknown as SearchService, undefined);
    }
}
