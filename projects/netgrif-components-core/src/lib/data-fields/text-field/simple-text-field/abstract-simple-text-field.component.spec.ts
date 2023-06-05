import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {TextField} from '../models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {AbstractSimpleTextFieldComponent} from './abstract-simple-text-field.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {Validator} from "../../../registry/model/validator";
import {minLengthValidation} from "../../models/validation-functions";
import {ValidationRegistryService} from "../../../registry/validation-registry.service";
import {DataFieldsModule} from "../../data-fields.module";

describe('AbstractSimpleTextFieldComponent', () => {
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
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new TextField('', '', 'text', {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, undefined, undefined, undefined, [{name: 'minlength', validationMessage: 'This is custom message!', arguments: {'length': {key: 'length', value: '5', dynamic: false}}}],
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
        }).compileComponents();

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
    template: ''
})
class TestTextComponent extends AbstractSimpleTextFieldComponent {
    constructor(_translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-text></ncc-test-text>'
})
class TestWrapperComponent {

}
