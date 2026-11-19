import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { DefaultPublicResolverComponent } from './default-public-resolver.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthenticationMethodService,
    ConfigurationService, MaterialModule, MockAuthenticationMethodService,
    TestConfigurationService, TranslateLibModule, UserService } from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('DefaultPublicResolverComponent', () => {
    let component: DefaultPublicResolverComponent;
    let fixture: ComponentFixture<DefaultPublicResolverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DefaultPublicResolverComponent],
            imports: [
                MaterialModule,
                RouterTestingModule.withRoutes([]),
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                UserService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPublicResolverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
