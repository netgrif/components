import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BooleanFieldComponent} from './boolean-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BooleanField} from './models/boolean-field';
import {MaterialModule} from '../../material/material.module';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('BooleanFieldComponent', () => {
    let component: BooleanFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                TranslateLibModule,
                HttpClientTestingModule, NoopAnimationsModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ],
            declarations: [
                BooleanFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
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
        expect(component.getErrorMessage()).toEqual('this is custom message');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-boolean-field [dataField]="field"></nae-boolean-field>'
})
class TestWrapperComponent {
    field = new BooleanField('', '', false, {
        editable: true
    }, undefined,
        undefined,
        undefined,
        [{validationRule: 'requiredTrue', validationMessage: 'this is custom message'}]);
}
