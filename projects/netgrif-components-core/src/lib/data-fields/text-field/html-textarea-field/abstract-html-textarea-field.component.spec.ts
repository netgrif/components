import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormControl, FormsModule} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {MaterialModule} from '../../../material/material.module';
import {AbstractHtmlTextareaFieldComponent} from './abstract-html-textarea-field.component';
import {DomSanitizer} from '@angular/platform-browser';
import {TextAreaField} from '../models/text-area-field';
import {QuillModule} from 'ngx-quill';

describe('AbstractHtmlTextareaFieldComponent', () => {
    let component: TestTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                CovalentModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                QuillModule.forRoot()
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [TestTextComponent, TestWrapperComponent],
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-text',
    template: ''
})
class TestTextComponent extends AbstractHtmlTextareaFieldComponent {
    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer) {
        super(_translate, _sanitizer);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: `<nae-test-text [showLargeLayout]="label"
                                 [formControlRef]="formControl"
                                 [textAreaField]="dataField"></nae-test-text>`
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    dataField = new TextAreaField('', '', 'text', {
        editable: true
    }, undefined, undefined, undefined, [{validationRule: 'regex 5', validationMessage: 'This is custom message!'}]);
    formControl = new FormControl();

    constructor() {
        this.formControl.enable();
        this.dataField.registerFormControl(this.formControl);
    }
}
