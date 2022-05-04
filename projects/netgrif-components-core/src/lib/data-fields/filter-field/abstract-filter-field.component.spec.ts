import {AbstractFilterFieldComponent} from './abstract-filter-field.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Inject, Injector, Optional} from '@angular/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {FilterField} from './models/filter-field';
import {FilterType} from '../../filter/models/filter-type';
import {ComponentType} from '@angular/cdk/portal';
import {AbstractFilterFieldContentComponent} from './abstract-filter-field-content.component';
import {SearchService} from '../../search/search-service/search.service';
import {of, Subject} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
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
    selector: 'nae-test-filter',
    template: ''
})
class TestFilterComponent extends AbstractFilterFieldComponent {
    constructor(parentInjector: Injector,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(parentInjector, informAboutInvalidData);
    }

    protected getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent> {
        return TestFilterContentComponent;
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-filter [dataField]="field"></nae-test-filter>'
})
class TestWrapperComponent {
    field = new FilterField('', '', '', {
        filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
    }, [], {}, '', '');
}

@Component({
    selector: 'nae-test-filter-content',
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
