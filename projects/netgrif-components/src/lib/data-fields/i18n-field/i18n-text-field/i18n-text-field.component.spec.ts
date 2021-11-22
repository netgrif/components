import {ComponentFixture, TestBed} from '@angular/core/testing';
import {I18nTextFieldComponent} from './i18n-text-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    I18nField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    WrappedBoolean
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

describe('I18nTextFieldComponent', () => {
    let component: I18nTextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [I18nTextFieldComponent, TestWrapperComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    @Component({
        selector: 'nc-test-wrapper',
        template: '<nc-i18n-text-field [formControlRef]="fc" [textI18nField]="field" [showLargeLayout]="boolean"></nc-i18n-text-field>'
    })
    class TestWrapperComponent {
        field = new I18nField('', '', '',  {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        });
        fc =  new FormControl('', { updateOn: 'blur' });
        boolean = new WrappedBoolean();

        constructor() {
            this.field.registerFormControl(this.fc);
        }
    }
});
