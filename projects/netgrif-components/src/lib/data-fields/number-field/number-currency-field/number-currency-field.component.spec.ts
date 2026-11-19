import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {DataFieldTemplateComponent} from '../../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../../required-label/required-label.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService, CurrencyModule,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NumberField,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService, WrappedBoolean
} from '@netgrif/components-core';
import {NumberCurrencyFieldComponent} from './number-currency-field.component';
import {FormControl} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('NumberCurrencyFieldComponent', () => {
    let component: NumberCurrencyFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                NumberCurrencyFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule,
                CurrencyModule
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
    template: '<nc-number-currency-field [dataField]="field" [formControlRef]="formControl"' +
        ' [showLargeLayout]="label"></nc-number-currency-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    field = new NumberField('', '', 4, {
        optional: true,
        visible: true,
        editable: true,
        hidden: true,
    }, [], '', '', null, {
        code: 'EUR',
        fractionSize: 2,
        locale: 'sk'
    });
    formControl = new FormControl();
    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}
