import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleAssignmentComponent} from './role-assignment.component';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RoleAssignmentService} from './services/role-assignment.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {Credentials} from '../../authentication/models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../authentication/models/user';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';

describe('RoleAssignmentComponent', () => {
    let component: RoleAssignmentComponent;
    let fixture: ComponentFixture<RoleAssignmentComponent>;
    let getAllSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MyAuth},
                RoleAssignmentService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            declarations: [
                RoleAssignmentComponent,
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleAssignmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        getAllSpy = spyOn(TestBed.inject(UserResourceService), 'getAll');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load next page', () => {
        component.loadNextUserPage();
        expect(getAllSpy).toHaveBeenCalled();
    });
});

class MyAuth extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<User> {
        return of({email: 'mail', id: 'id', name: 'name', surname: 'surname'});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}
