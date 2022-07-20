import {TestBed} from '@angular/core/testing';

import {AccessService} from './access.service';
import {MaterialModule} from "../../material/material.module";
import {CommonModule} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLibModule} from "../../translate/translate-lib.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../user/services/user.service";
import {MockUserService} from "../../utility/tests/mocks/mock-user.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ConfigurationService} from "../../configuration/configuration.service";
import {TestConfigurationService} from "../../utility/tests/test-config";
import {AuthenticationModule} from "../../authentication/authentication.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('AccessService', () => {
    let service: AccessService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                NoopAnimationsModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                AuthenticationModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                AccessService,
                {provide: UserService, useClass: MockUserService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [],
            schemas: [NO_ERRORS_SCHEMA]
        });
        service = TestBed.inject(AccessService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
