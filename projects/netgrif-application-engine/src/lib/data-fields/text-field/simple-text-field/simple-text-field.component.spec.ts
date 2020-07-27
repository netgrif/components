import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SimpleTextFieldComponent} from './simple-text-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TextField} from '../models/text-field';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl} from '@angular/forms';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';

describe('SimpleTextFieldComponent', () => {
    let component: SimpleTextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService}
            ],
            declarations: [SimpleTextFieldComponent, TestWrapperComponent],
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

    it('should get error message', () => {
        expect(component.getErrorMessage()).toEqual('This is custom message!');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: `<nae-simple-text-field [showLargeLayout]="label"
                                      [textField]="field"
                                      [formControlRef]="formControl">
                </nae-simple-text-field>`
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new TextField('', '', 'text', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, [{validationRule: 'length 5', validationMessage: 'This is custom message!'}]);
    formControl = new FormControl();

    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}
