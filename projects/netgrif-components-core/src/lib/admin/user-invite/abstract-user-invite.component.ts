import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ExtendedProcessRole, ProcessList, ProcessListItem} from '../role-assignment/services/ProcessList';
import {GroupInterface} from '../../resources/interface/group';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {UserInviteService} from './services/user-invite.service';
import {OrganizationListService} from './services/organization-list.service';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {UserInvitationRequest} from '../../authentication/sign-up/models/user-invitation-request';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, take} from 'rxjs/operators';
import {Subscription} from "rxjs";

@Component({
    selector: 'ncc-abstract-user-invite',
    template: ''
})
export abstract class AbstractUserInviteComponent implements OnInit, OnDestroy {

    public invitedEmailControl: FormControl;
    public invitedGroups: Array<GroupInterface>;
    public invitedRoles: Array<ExtendedProcessRole>;
    public nets: ProcessList;
    public filteredProcesses: Array<ProcessListItem> = [];
    protected SEARCH_DEBOUNCE_TIME = 600;
    public searchNetControl = new FormControl();
    protected subNetValueChanges: Subscription;
    public loading: LoadingEmitter;

    constructor(protected _userInviteService: UserInviteService,
                protected _orgList: OrganizationListService,
                protected _signUpService: SignUpService,
                protected _snackBar: SnackBarService,
                protected _translate: TranslateService) {
        this.nets = this._userInviteService.processList;
        this.loading = new LoadingEmitter();
        this.invitedEmailControl = new FormControl('', [Validators.email, Validators.required]);
        this.invitedGroups = [];
        this.invitedRoles = [];
    }

    public get groups() {
        return this._orgList.groups;
    }

    ngOnInit(): void {
        this.nets.loadProcesses().subscribe(processes => {
            this.filteredProcesses = processes;
        });
        this._orgList.loadGroups();
        this.subNetValueChanges = this.searchNetControl.valueChanges.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME)).subscribe(searchText => {
            this.filteredProcesses = this.nets.processes.filter(itm => itm.title.toLowerCase().includes(searchText.toLowerCase()));
        });
    }

    ngOnDestroy(): void {
        this.subNetValueChanges.unsubscribe();
        this.nets = undefined;
        this.filteredProcesses = undefined;
    }

    public removeGroup(org: GroupInterface): void {
        const itemIndex = this.invitedGroups.findIndex(g => g.id === org.id);
        if (itemIndex !== -1) {
            this.invitedGroups.splice(itemIndex, 1);
        }
    }

    public addGroup(org: GroupInterface): void {
        const itemIndex = this.invitedGroups.findIndex(g => g.id === org.id);
        if (itemIndex === -1) {
            this.invitedGroups.push(org);
        }
    }

    public removeRole(role: ExtendedProcessRole): void {
        const itemIndex = this.invitedRoles.findIndex(r => r.stringId === role.stringId);
        if (itemIndex !== -1) {
            this.invitedRoles.splice(itemIndex, 1);
        }
    }

    public addRole(role: ExtendedProcessRole): void {
        const itemIndex = this.invitedRoles.findIndex(r => r.stringId === role.stringId);
        if (itemIndex === -1) {
            this.invitedRoles.push(role);
        }
    }

    public invite(): void {
        if (!this.invitedEmailControl.valid) {
            this._snackBar.openErrorSnackBar(this._translate.instant('admin.user-invite.emailFieldMandatory'));
            return;
        }
        if (this.invitedGroups.length === 0) {
            this._snackBar.openErrorSnackBar(this._translate.instant('admin.user-invite.oneOrMoreOrganization'));
            return;
        }

        const invitation: UserInvitationRequest = {
            email: this.invitedEmailControl.value,
            groups: this.invitedGroups.map(org => org.id),
            processRoles: this.invitedRoles.map(role => role.stringId)
        };

        this.loading.on();
        this._signUpService.invite(invitation).pipe(take(1)).subscribe(success => {
            if (success) {
                this._snackBar.openSuccessSnackBar(this._translate.instant('admin.user-invite.inviteSent'));
                this.invitedEmailControl.setValue('');
                this.invitedGroups = [];
                this.invitedRoles = [];
            } else {
                this._snackBar.openErrorSnackBar(this._translate.instant('admin.user-invite.inviteFailed'));
            }
            this.loading.off();
        });
    }
}
