import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl} from '@angular/forms';
import {EnumerationField, MaterialModule, TranslateLibModule, WrappedBoolean} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EnumerationStepperFieldComponent} from './enumeration-stepper-field.component';

describe('EnumerationStepperFieldComponent', () => {
    let component: EnumerationStepperFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            declarations: [EnumerationStepperFieldComponent, TestWrapperComponent],
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
    template: '<nc-enumeration-stepper-field [showLargeLayout]="label" [enumerationField]="field" [formControlRef]="form">' +
        '</nc-enumeration-stepper-field>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new EnumerationField('', '', '', [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
    form = new FormControl();
}
