import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnDestroy, Optional, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractNumberErrorsComponent} from './abstract-number-errors.component';
import {NumberField} from './models/number-field';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
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
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractNumberErrorsComponent', () => {
    let component: TestNumErrorComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestNumErrorComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule
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
                        }, [
                            {validationRule: 'odd', validationMessage: 'This is custom odd message!'},
                            {validationRule: 'even', validationMessage: ''},
                            {validationRule: 'positive', validationMessage: 'This is custom message!'},
                            {validationRule: 'negative', validationMessage: 'This is custom message!'},
                            {validationRule: 'decimal', validationMessage: 'This is custom message!'},
                            {validationRule: 'inrange inf,0', validationMessage: 'This is custom message!'},
                            {validationRule: 'inrange 0,inf', validationMessage: 'This is custom message!'},
                            {validationRule: 'inrange -5,0', validationMessage: 'This is custom message!'},
                        ]),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<NumberField>
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestNumErrorComponent extends AbstractNumberErrorsComponent {
    constructor(translate: TranslateService, @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>) {
        super(translate, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-num-err></ncc-test-num-err>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent  {

}
