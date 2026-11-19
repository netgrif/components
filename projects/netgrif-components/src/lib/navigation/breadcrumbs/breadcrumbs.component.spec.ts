import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BreadcrumbsComponent} from './breadcrumbs.component';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    TestConfigurationService, TranslateLibModule, AuthenticationModule
} from '@netgrif/components-core';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('BreadcrumbsComponent', () => {
    let component: BreadcrumbsComponent;
    let fixture: ComponentFixture<BreadcrumbsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BreadcrumbsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                TranslateLibModule,
                AuthenticationModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbsComponent);
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
