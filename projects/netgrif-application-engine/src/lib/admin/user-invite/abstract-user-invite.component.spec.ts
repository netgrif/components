import { AbstractUserInviteComponent } from './abstract-user-invite.component';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserInviteService} from './services/user-invite.service';
import {OrganizationListService} from './services/organization-list.service';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';

describe('AbstractUserInviteComponent', () => {
    let component: TestUserInviteComponent;
    let fixture: ComponentFixture<TestUserInviteComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule],
            declarations: [ TestUserInviteComponent ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SignUpService
            ]
        }).compileComponents();
        spyOn(console, 'error');
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestUserInviteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-role-assignment',
    template: '',
})
class TestUserInviteComponent extends AbstractUserInviteComponent {
    constructor(protected _userInviteService: UserInviteService,
                protected _orgList: OrganizationListService,
                protected _signUpService: SignUpService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService) {
        super(_userInviteService, _orgList, _signUpService, _snackBar, _translate);
    }
}
