import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from '@angular/core';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MaterialModule} from '../../../material/material.module';
import {TranslateService} from '@ngx-translate/core';
import {BooleanField} from '../models/boolean-field';
import {AbstractBooleanDefaultFieldComponent} from "./abstract-boolean-default-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {ValidationRegistryService} from "../../../registry/validation-registry.service";
import {requiredTrueValidation} from "../../models/validation-functions";
import {Validator} from "../../../registry/model/validator";
import {DataFieldsModule} from "../../data-fields.module";

describe('AbstractBooleanDefaultFieldComponent', () => {
    let component: TestBooleanComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                DataFieldsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new BooleanField('', '', false, {
                                editable: true
                            }, undefined,
                            undefined,
                            undefined,
                            [{name: 'requiredTrue', validationMessage: 'this is custom message'}],
                            undefined,
                            undefined,
                            new Map<string, Validator>([['requiredTrue', requiredTrueValidation]])),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<BooleanField>
                }
            ],
            declarations: [
                TestBooleanComponent,
                TestWrapperComponent
            ],
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
        expect(component.getErrorMessage()).toEqual('this is custom message');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-default-boolean',
    template: ''
})
class TestBooleanComponent extends AbstractBooleanDefaultFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<BooleanField>,
                _validationRegistry: ValidationRegistryService) {
        super(translate, dataFieldPortalData, _validationRegistry);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-default-boolean></ncc-test-default-boolean>'
})
class TestWrapperComponent {

}
