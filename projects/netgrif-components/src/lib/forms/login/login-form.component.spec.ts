import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginFormComponent} from './login-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';
import {
    TranslateLibModule,
    MaterialModule,
    Credentials,
    TestConfigurationService,
    ConfigurationService,
    AuthenticationMethodService,
} from '@netgrif/application-engine';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [LoginFormComponent],
            providers: [
                {provide: AuthenticationMethodService, useClass: MyAuth},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', () => {
        component.rootFormGroup.controls['login'].setValue('login');
        component.rootFormGroup.controls['password'].setValue('pass');
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({username: 'login', password: 'pass'});
        });
        component.onSubmit();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

class MyAuth extends AuthenticationMethodService {

    constructor() {
        super();
    }

    login(credentials: Credentials): Observable<any> {
        return of({email: 'mail', id: 'id', name: 'name', surname: 'surname'});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}

