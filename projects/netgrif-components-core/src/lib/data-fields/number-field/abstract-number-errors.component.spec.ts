import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnDestroy, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractNumberErrorsComponent} from './abstract-number-errors.component';
import {NumberField} from './models/number-field';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {AngularResizeEventModule} from 'angular-resize-event';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {LanguageService} from '../../translate/language.service';
import {FormControl} from '@angular/forms';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {WrappedBoolean} from "../data-field-template/models/wrapped-boolean";
import {Validator} from "../../registry/model/validator";
import {
    decimalValidation,
    evenValidation, inRangeValidation,
    negativeValidation,
    oddValidation,
    positiveValidation
} from "../models/validation-functions";
import {ValidationRegistryService} from "../../registry/validation-registry.service";
import {DataFieldsModule} from "../data-fields.module";

describe('AbstractNumberErrorsComponent', () => {
    let component: TestNumErrorComponent;
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
                {provide: AuthenticationMethodService, useCLass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new NumberField('', '', 4, {
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        },[
                                {name: 'odd', validationMessage: 'This is custom odd message!'},
                                {name: 'even', validationMessage: ''},
                                {name: 'positive', validationMessage: 'This is custom message!'},
                                {name: 'negative', validationMessage: 'This is custom message!'},
                                {name: 'decimal', validationMessage: 'This is custom message!'},
                                {name: 'inrange', validationMessage: 'This is custom message!', arguments: {'from': {key: 'from', value: 'inf', dynamic: false}, 'to': {key: 'to', value: '0', dynamic: false}}},
                                {name: 'inrange', validationMessage: 'This is custom message!', arguments: {'from': {key: 'from', value: '0', dynamic: false}, 'to': {key: 'to', value: 'inf', dynamic: false}}},
                                {name: 'inrange', validationMessage: 'This is custom message!', arguments: {'from': {key: 'from', value: '-5', dynamic: false}, 'to': {key: 'to', value: '0', dynamic: false}}},
                            ],
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            new Map<string, Validator>([
                                ['odd', oddValidation],
                                ['even', evenValidation],
                                ['positive', positiveValidation],
                                ['negative', negativeValidation],
                                ['decimal', decimalValidation],
                                ['inrange', inRangeValidation]
                            ])),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<NumberField>
                }
            ],
            declarations: [
                TestNumErrorComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        TestBed.inject(LanguageService);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get error message', () => {
        expect(component.getErrorMessage()).toEqual('This is custom odd message!');

        component.dataField.value = 5;
        expect(component.getErrorMessage()).toEqual('Entered number must be even');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-num-err',
    template: ''
})
class TestNumErrorComponent extends AbstractNumberErrorsComponent {
    constructor(translate: TranslateService, @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                _validationRegistry: ValidationRegistryService) {
        super(translate, dataFieldPortalData, _validationRegistry);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-num-err></ncc-test-num-err>'
})
class TestWrapperComponent  {

}
