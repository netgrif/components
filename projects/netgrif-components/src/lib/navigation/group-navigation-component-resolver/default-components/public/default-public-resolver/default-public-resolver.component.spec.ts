import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { DefaultPublicResolverComponent } from './default-public-resolver.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthenticationMethodService,
    ConfigurationService, MaterialModule, MockAuthenticationMethodService,
    TestConfigurationService, TranslateLibModule, UserService } from '@netgrif/components-core';

describe('DefaultPublicResolverComponent', () => {
    let component: DefaultPublicResolverComponent;
    let fixture: ComponentFixture<DefaultPublicResolverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DefaultPublicResolverComponent],
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([]),
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                UserService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPublicResolverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
