import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {BooleanFieldComponent} from './boolean-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    AuthenticationMethodService,
    AuthenticationService,
    BooleanField,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService
} from '@netgrif/application-engine';

describe('BooleanFieldComponent', () => {
    let component: BooleanFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                TranslateLibModule,
                HttpClientTestingModule, NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
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
        }).compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-boolean-field [dataField]="field"></nc-boolean-field>'
})
class TestWrapperComponent {
    field = new BooleanField('', '', false, {
            editable: true
        }, undefined,
        undefined,
        undefined,
        []);
}
