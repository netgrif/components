import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {FormControl} from '@angular/forms';
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
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractHtmlTextareaFieldComponent', () => {
    let component: TestTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestTextComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                CovalentModule,
                TranslateLibModule,
                QuillModule.forRoot()
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new TextAreaField('', '', 'text', {
                            editable: true
                        }, undefined, undefined, undefined, [{validationRule: 'regex 5', validationMessage: 'This is custom message!'}]),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<TextAreaField>
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestTextComponent extends AbstractHtmlTextareaFieldComponent {
    constructor(protected _translate: TranslateService, protected _sanitizer: DomSanitizer,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, _sanitizer, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: `
        <ncc-test-text></ncc-test-text>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
}
