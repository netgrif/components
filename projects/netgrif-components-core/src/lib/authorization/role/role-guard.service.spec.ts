import {TestBed} from '@angular/core/testing';

import {MaterialModule} from "../../material/material.module";
import {CommonModule} from "@angular/common";
import {FlexModule} from "@ngbracket/ngx-layout";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLibModule} from "../../translate/translate-lib.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../user/services/user.service";
import {MockUserService} from "../../utility/tests/mocks/mock-user.service";
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import {ConfigurationService} from "../../configuration/configuration.service";
import {TestConfigurationService} from "../../utility/tests/test-config";
import {AuthenticationModule} from "../../authentication/authentication.module";
import {RouterTestingModule} from "@angular/router/testing";
import { RoleGuardService } from './role-guard.service';
import { Access, View } from '../../../commons/schema';
import { User } from '../../user/models/user';

describe('RoleGuardService', () => {
    let service: RoleGuardService;

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
                RoleGuardService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserService, useClass: CustomMockUserService},
            ],
            declarations: [],
            schemas: [NO_ERRORS_SCHEMA]
        });
        service = TestBed.inject(RoleGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should access view with role only', () => {
        const view = {access: {role: ['test.role_user']} as Access} as View
        expect(service.canAccessView(view, 'test')).toBeTrue();
    });

    it('should not access view', () => {
        const view = {access: {role: [], bannedRole: []} as Access} as View
        expect(service.canAccessView(view, 'test')).toBeFalse();
    });

    it('should not access view with banned role only', () => {
        const view = {access: {bannedRole: ['test.banned_role']} as Access} as View
        expect(service.canAccessView(view, 'test')).toBeFalse();
    });

    it('should not access view with role and banned role', () => {
        const view = {access: {role: ['test.role_user'], bannedRole: ['test.banned_role']} as Access} as View
        expect(service.canAccessView(view, 'test')).toBeFalse();
    });
});

@Injectable()
class CustomMockUserService extends MockUserService {
    constructor() {
        super();
        this._user = new User('123', 'test@netgrif.com', 'Test', 'User', ['ROLE_USER'], [{
            stringId: 'role_user',
            name: 'role_user',
            description: '',
            importId: 'role_user',
            netImportId: 'test',
            netVersion: '1.0.0',
            netStringId: 'test',
        },{
            stringId: 'banned_role',
            name: 'banned_role',
            description: '',
            importId: 'banned_role',
            netImportId: 'test',
            netVersion: '1.0.0',
            netStringId: 'test',
        } ]);
    }
}
