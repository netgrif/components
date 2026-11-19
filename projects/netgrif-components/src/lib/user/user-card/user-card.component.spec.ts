import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCardComponent} from './user-card.component';
import {CommonModule} from '@angular/common';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockUserPreferenceService,
    TestConfigurationService,
    TranslateLibModule,
    UserPreferenceService
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('UserCardComponent', () => {
    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UserCardComponent],
            imports: [
                CommonModule,
                MaterialModule,
                RouterTestingModule.withRoutes([]),
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserPreferenceService, useValue: MockUserPreferenceService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
