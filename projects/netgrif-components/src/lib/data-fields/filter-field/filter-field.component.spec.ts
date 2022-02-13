import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterFieldComponent} from './filter-field.component';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {FilterFieldContentComponent} from './filter-field-content/filter-field-content.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MaterialModule, FilterType, FilterField, ConfigurationService, TestConfigurationService} from '@netgrif/components-core';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AdvancedSearchComponentModule} from '../../search/advanced-search/advanced-search.module';

describe('FilterFieldComponent', () => {
    let component: FilterFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AdvancedSearchComponentModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                FilterFieldComponent,
                FilterFieldContentComponent,
                TestWrapperComponent
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    FilterFieldContentComponent
                ]
            }
        }).compileComponents();
    });

    beforeEach(() => {
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
    selector: 'nc-test-wrapper',
    template: '<nc-filter-field [dataField]="field"></nc-filter-field>'
})
class TestWrapperComponent {
    field = new FilterField('', '', '', {
        filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
    }, [], {}, '', '');
}
