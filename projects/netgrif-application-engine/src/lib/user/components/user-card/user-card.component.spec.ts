import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCardComponent} from './user-card.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {UserPreferenceService} from '../../services/user-preference.service';
import {MockUserPreferenceService} from '../../../utility/tests/mocks/mock-user-preference.service';

describe('UserCardComponent', () => {
    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserCardComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                TranslateLibModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserPreferenceService, useValue: MockUserPreferenceService}
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

    it('should return user banner', () => {
        expect(component.userBanner).toEqual('assets/default-user-background.jpg');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
