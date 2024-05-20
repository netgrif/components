import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { NumberDecimalFieldComponent } from './number-decimal-field.component';
import {AngularResizeEventModule} from "angular-resize-event";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NumberField,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService, WrappedBoolean
} from '@netgrif/components-core';
import {DecimalPipe} from "@angular/common";

describe('NumberDecimalFieldComponent', () => {
    let component: NumberDecimalFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                DecimalPipe
            ],
            declarations: [
                NumberDecimalFieldComponent,
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
    template: '<nc-number-decimal-field [dataField]="field" [formControlRef]="formControl" ' +
        '[showLargeLayout]="label"></nc-number-decimal-field>'
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new NumberField('', '', 4, {
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, []);
    formControl = new FormControl();
    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}
