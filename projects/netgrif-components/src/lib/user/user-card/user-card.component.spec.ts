import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCardComponent} from './user-card.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
    MaterialModule,
    TranslateLibModule,
    AuthenticationMethodService,
    ConfigurationService,
    TestConfigurationService,
    UserPreferenceService,
    MockUserPreferenceService
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

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
                TranslateLibModule,
                NoopAnimationsModule
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
