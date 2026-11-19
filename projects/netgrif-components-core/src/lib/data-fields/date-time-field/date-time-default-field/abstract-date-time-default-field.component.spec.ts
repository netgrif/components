import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MaterialModule} from "../../../material/material.module";
import {TranslateLibModule} from "../../../translate/translate-lib.module";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {AuthenticationMethodService} from "../../../authentication/services/authentication-method.service";
import {MockAuthenticationMethodService} from "../../../utility/tests/mocks/mock-authentication-method-service";
import {AuthenticationService} from "../../../authentication/services/authentication/authentication.service";
import {MockAuthenticationService} from "../../../utility/tests/mocks/mock-authentication.service";
import {UserResourceService} from "../../../resources/engine-endpoint/user-resource.service";
import {MockUserResourceService} from "../../../utility/tests/mocks/mock-user-resource.service";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {TestConfigurationService} from "../../../utility/tests/test-config";
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional, ChangeDetectionStrategy} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {DateTimeField} from "../models/date-time-field";
import moment from "moment/moment";
import {AbstractDateTimeDefaultFieldComponent} from "./abstract-date-time-default-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {CustomDateAdapter} from "../../date-field/models/custom-date-adapter";
import {LanguageService} from "../../../translate/language.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractDatetimeDefaultFieldComponent', () => {
    let component: TestDateTimeFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestDateTimeFieldComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new DateTimeField('', '', moment('2020-03-09'), {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, undefined, undefined, undefined, [
                            {validationRule: 'between today,future', validationMessage: 'This is custom message!'},
                            {validationRule: 'between past,today', validationMessage: 'This is custom message!'},
                            {validationRule: 'between 2020-03-03,today', validationMessage: 'This is custom message!'},
                        ]),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<DateTimeField>
                },
                {provide: DateAdapter, useClass: CustomDateAdapter},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    selector: 'ncc-test-date-time',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestDateTimeFieldComponent extends AbstractDateTimeDefaultFieldComponent {
    constructor(_translate: TranslateService,
                _adapter: DateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData)
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-date-time></ncc-test-date-time>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
}
