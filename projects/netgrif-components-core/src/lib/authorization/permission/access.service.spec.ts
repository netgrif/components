import {TestBed} from '@angular/core/testing';

import {AccessService} from './access.service';
import {MaterialModule} from "../../material/material.module";
import {CommonModule} from "@angular/common";
import {FlexModule} from "@ngbracket/ngx-layout";
import {TranslateLibModule} from "../../translate/translate-lib.module";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {UserService} from "../../user/services/user.service";
import {MockUserService} from "../../utility/tests/mocks/mock-user.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ConfigurationService} from "../../configuration/configuration.service";
import {TestConfigurationService} from "../../utility/tests/test-config";
import {AuthenticationModule} from "../../authentication/authentication.module";
import {RouterTestingModule} from "@angular/router/testing";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AccessService', () => {
    let service: AccessService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                TranslateLibModule,
                AuthenticationModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                AccessService,
                {provide: UserService, useClass: MockUserService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(AccessService);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
