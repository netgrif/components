import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterFieldComponent} from './filter-field.component';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {FilterFieldContentComponent} from './filter-field-content/filter-field-content.component';
import {MaterialModule, FieldTypeResource, FilterField, ConfigurationService, TestConfigurationService} from '@netgrif/components-core';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AdvancedSearchComponentModule} from '../../search/advanced-search/advanced-search.module';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FilterFieldComponent', () => {
    let component: FilterFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                FilterFieldComponent,
                FilterFieldContentComponent,
                TestWrapperComponent
            ],
            imports: [
                MaterialModule,
                AdvancedSearchComponentModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    template: '<nc-filter-field [dataField]="field"></nc-filter-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    field = new FilterField('', '', '', FieldTypeResource.CASE_FILTER, [], {}, '', '');
}
