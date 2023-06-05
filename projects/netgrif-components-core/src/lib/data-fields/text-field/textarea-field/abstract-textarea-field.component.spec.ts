import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NgZone, Optional} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AbstractTextareaFieldComponent} from './abstract-textarea-field.component';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TextField} from '../models/text-field';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MaterialModule} from '../../../material/material.module';
import {TranslateService} from '@ngx-translate/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {TextAreaField} from "../models/text-area-field";
import {Validator} from "../../../registry/model/validator";
import {minLengthValidation, requiredTrueValidation} from "../../models/validation-functions";
import {ValidationRegistryService} from "../../../registry/validation-registry.service";
import {DataFieldsModule} from "../../data-fields.module";

describe('AbstractTextareaFieldComponent', () => {
    let component: TestTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                DataFieldsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new TextField('', '', 'text', {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, undefined, undefined, undefined,
                            [{name: 'minlength', validationMessage: 'This is custom message!', arguments: {'length': {key: 'length', value: '5', dynamic: false}}}],
                            undefined,
                            undefined,
                            new Map<string, Validator>([['minlength', minLengthValidation]])),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<TextField>
                }
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
    selector: 'ncc-test-text',
    template: '<textarea matInput\n' +
        '              #textArea\n' +
        '              [placeholder]="dataField.placeholder"\n' +
        '              [required]="dataField.behavior.required"\n' +
        '              [formControl]="formControlRef"\n' +
        '              [ngStyle]="{\'min-height\': getHeight()+\'px\', \'height\': getHeight()+\'px\'}"\n' +
        '              #dynamicTextArea="cdkTextareaAutosize"\n' +
        '              cdkTextareaAutosize\n' +
        '              cdkAutosizeMinRows="1"></textarea>'
})
class TestTextComponent extends AbstractTextareaFieldComponent {
    constructor(_translate: TranslateService, protected _ngZone: NgZone,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>,
                _registryService: ValidationRegistryService) {
        super(_translate, _ngZone, dataFieldPortalData, _registryService);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-text></ncc-test-text>'
})
class TestWrapperComponent {

}
