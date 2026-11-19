import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {EnumerationFieldComponent} from './enumeration-field.component';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {EnumerationSelectFieldComponent} from './enumeration-select-field/enumeration-select-field.component';
import {EnumerationListFieldComponent} from './enumeration-list-field/enumeration-list-field.component';
import {
    EnumerationAutocompleteSelectFieldComponent
} from './enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component';
import {EnumerationField, MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {EnumerationStepperFieldComponent} from './enumeration-stepper-field/enumeration-stepper-field.component';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('EnumerationFieldComponent', () => {
    let component: EnumerationFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnumerationFieldComponent,
                EnumerationSelectFieldComponent,
                EnumerationListFieldComponent,
                EnumerationAutocompleteSelectFieldComponent,
                EnumerationStepperFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule,
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-enumeration-field [dataField]="field"></nc-enumeration-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    field = new EnumerationField('', '', '', [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
