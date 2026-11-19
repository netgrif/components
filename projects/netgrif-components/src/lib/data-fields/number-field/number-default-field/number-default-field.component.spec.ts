import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {DataFieldTemplateComponent} from '../../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../../required-label/required-label.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NumberField,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService, WrappedBoolean
} from '@netgrif/components-core';
import {NumberDefaultFieldComponent} from './number-default-field.component';
import {FormControl} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('NumberDefaultFieldComponent', () => {
    let component: NumberDefaultFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                NumberDefaultFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule,
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-number-default-field [dataField]="field" [formControlRef]="formControl" ' +
        '[showLargeLayout]="label"></nc-number-default-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new NumberField('', '', 4, {
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, []);
    formControl = new FormControl();
    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}
