import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractRichTextareaFieldComponent} from './abstract-rich-textarea-field.component';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {TextAreaField} from "../models/text-area-field";

describe('AbstractRichTextareaFieldComponent', () => {
    let component: TestTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                CovalentModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
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
    template: ''
})
class TestTextComponent extends AbstractRichTextareaFieldComponent {
    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextAreaField>) {
        super(_translate, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-text></ncc-test-text>'
})
class TestWrapperComponent {

}
