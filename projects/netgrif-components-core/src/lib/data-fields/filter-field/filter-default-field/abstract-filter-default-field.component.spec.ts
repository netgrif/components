import {ComponentFixture, TestBed} from "@angular/core/testing";
import {of, Subject} from "rxjs";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {Component, Inject, Injector, Optional} from "@angular/core";
import {ComponentType} from "@angular/cdk/portal";
import {AbstractFilterFieldContentComponent} from "../abstract-filter-field-content.component";
import {FilterField} from "../models/filter-field";
import {FilterType} from "../../../filter/models/filter-type";
import {SearchService} from "../../../search/search-service/search.service";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractFilterDefaultFieldComponent} from "./abstract-filter-default-field.component";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";

describe('AbstractFilterDefaultFieldComponent', () => {
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
            providers: [
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new FilterField('', '', '', {
                            filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
                        }, [], {}, '', ''),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<FilterField>
                }
            ],
            declarations: [
                TestWrapperComponent,
                TestFilterComponent,
                TestFilterContentComponent
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    TestFilterContentComponent
                ]
            }
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
    template: '<ncc-test-filter></ncc-test-filter>'
})
class TestWrapperComponent {

}

@Component({
    selector: 'ncc-test-filter-content',
    template: ''
})
class TestFilterContentComponent extends AbstractFilterFieldContentComponent {
    constructor() {
        super({} as FilterField, {
            loadFromMetadata: () => {
            },
            loadingFromMetadata$: of(false)
        } as unknown as SearchService);
    }
}
