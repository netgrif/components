import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MaterialModule} from "../../../material/material.module";
import {AngularResizeEventModule} from "angular-resize-event";
import {TranslateLibModule} from "../../../translate/translate-lib.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationMethodService} from "../../../authentication/services/authentication-method.service";
import {MockAuthenticationMethodService} from "../../../utility/tests/mocks/mock-authentication-method-service";
import {AuthenticationService} from "../../../authentication/services/authentication/authentication.service";
import {MockAuthenticationService} from "../../../utility/tests/mocks/mock-authentication.service";
import {UserResourceService} from "../../../resources/engine-endpoint/user-resource.service";
import {MockUserResourceService} from "../../../utility/tests/mocks/mock-user-resource.service";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {TestConfigurationService} from "../../../utility/tests/test-config";
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {DateField} from "../models/date-field";
import moment from "moment/moment";
import {AbstractDateDefaultFieldComponent} from "./abstract-date-default-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {ValidationRegistryService} from "../../../registry/validation-registry.service";
import {Validator} from "../../../registry/model/validator";
import {weekendValidation, workdayValidation} from "../../models/validation-functions";
import {DataFieldsModule} from "../../data-fields.module";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {LanguageService} from "../../../translate/language.service";
import {CustomDateAdapter} from "../models/custom-date-adapter";

describe('AbstractDateDefaultFieldComponent', () => {
    let component: TestDateFieldComponent;
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
                        dataField: new DateField('', '', moment(new Date()), {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, undefined, undefined, undefined, [
                                {name: 'weekend', validationMessage: 'This is custom message!'},
                                {name: 'workday', validationMessage: 'This is custom message!'}
                            ],
                            undefined,
                            undefined,
                            new Map<string, Validator>([
                                ['weekend', weekendValidation],
                                ['workday', workdayValidation]
                            ])
                        ),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<DateField>
                },
                {provide: DateAdapter, useClass: CustomDateAdapter}
            ],
            declarations: [
                TestDateFieldComponent,
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
        expect(component.getErrorMessage()).toEqual('This is custom message!');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-date',
    template: ''
})
class TestDateFieldComponent extends AbstractDateDefaultFieldComponent {
    constructor(_translate: TranslateService,
                _adapter: DateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData, _validationRegistry);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-date></ncc-test-date>'
})
class TestWrapperComponent {

}
