import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {EnumerationFieldComponent} from './enumeration-field.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {EnumerationSelectFieldComponent} from './enumeration-select-field/enumeration-select-field.component';
import {EnumerationListFieldComponent} from './enumeration-list-field/enumeration-list-field.component';
// tslint:disable-next-line:max-line-length
import {EnumerationAutocompleteSelectFieldComponent} from './enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {EnumerationField, MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EnumerationStepperFieldComponent} from './enumeration-stepper-field/enumeration-stepper-field.component';

describe('EnumerationFieldComponent', () => {
    let component: EnumerationFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
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
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
    template: '<nc-enumeration-field [dataField]="field"></nc-enumeration-field>'
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
