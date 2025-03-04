import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../../material/material.module';
import {AngularResizeEventModule} from 'angular-resize-event';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ButtonField} from '../models/button-field';
import {LanguageService} from '../../../translate/language.service';
import {DialogService} from '../../../dialog/services/dialog.service';
import {AbstractButtonDefaultFieldComponent} from "./abstract-button-default-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";

describe('AbstractButtonDefaultFieldComponent', () => {
    let component: TestButtonComponent;
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
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new ButtonField('', '', {
                            required: true,
                        }),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<ButtonField>
                }
            ],
            declarations: [
                TestButtonComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        const initializeLanguage = TestBed.inject(LanguageService);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get error message', () => {
        component.dataField.value = undefined;
        expect(component.getErrorMessage()).toEqual('This field is required!');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-button',
    template: ''
})
class TestButtonComponent extends AbstractButtonDefaultFieldComponent {
    constructor(translate: TranslateService,
                dialog: DialogService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<ButtonField>) {
        super(translate, dialog, validationRegistry, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-button></ncc-test-button>'
})
class TestWrapperComponent {

}
