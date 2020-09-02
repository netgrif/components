import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NumberFieldComponent} from './number-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
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
    NumberField,
    LanguageService
} from '@netgrif/application-engine';

describe('NumberFieldComponent', () => {
    let component: NumberFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                NumberFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        const initializeLang = TestBed.inject(LanguageService);
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-number-field [dataField]="field"></nc-number-field>'
})
class TestWrapperComponent {
    field = new NumberField('', '', 4, {
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
    ]);
}
