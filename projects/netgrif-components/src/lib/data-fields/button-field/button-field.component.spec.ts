import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonFieldComponent} from './button-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    MaterialModule,
    TranslateLibModule,
    AuthenticationMethodService,
    AuthenticationService,
    UserResourceService,
    ConfigurationService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    ButtonField,
    LanguageService
} from '@netgrif/application-engine';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ButtonFieldComponent', () => {
    let component: ButtonFieldComponent;
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
                ButtonFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();

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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-button-field [dataField]="field"></nc-button-field>'
})
class TestWrapperComponent {
    field = new ButtonField('', '', {
        required: true,
    });
}

