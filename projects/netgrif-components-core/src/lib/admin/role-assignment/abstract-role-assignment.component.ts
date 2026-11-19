import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {MatSelectionList} from '@angular/material/list';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {UserListItem, UserListService} from '../../user/services/user-list.service';
import {ProcessList, ExtendedProcessRole, ProcessVersion, ProcessListItem} from './services/ProcessList';
import {FormControl} from '@angular/forms';
import {RoleAssignmentService} from './services/role-assignment.service';
import {UserService} from '../../user/services/user.service';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-role',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractRoleAssignmentComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('userList') public userList: MatSelectionList;
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    public users: UserListService;
    public nets: ProcessList;
    public filteredProcesses: Array<ProcessListItem> = [];
    public userMultiSelect: boolean;
    public searchUserControl = new FormControl();
    public searchNetControl = new FormControl();
    protected SEARCH_DEBOUNCE_TIME = 600;
    protected subValueChanges: Subscription;
    protected subNetValueChanges: Subscription;
    protected subUsers: Subscription;

    constructor(protected _service: RoleAssignmentService, protected _userService: UserService) {
        this.users = this._service.userList;
        this.nets = this._service.processList;
        this.userMultiSelect = true;
    }

    ngOnInit(): void {
        this.nets.loadProcesses().subscribe(processes => {
            this.filteredProcesses = processes;
        });
        this.subValueChanges = this.searchUserControl.valueChanges.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME)).subscribe(searchText => {
            this.users.reload(searchText);
        });
        this.subNetValueChanges = this.searchNetControl.valueChanges.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME)).subscribe(searchText => {
            this.filteredProcesses = this.nets.processes.filter(itm => itm.title.toLowerCase().includes(searchText.toLowerCase()));
        });
    }

    ngAfterViewInit(): void {
        this.subUsers = this.users.usersReload$.subscribe(() => {
            this.userList.deselectAll();
            this.userList.selectedOptions.clear();
            this.autoSelectRoles();
        });
    }

    ngOnDestroy(): void {
        this._userService.reload();
        this.subValueChanges.unsubscribe();
        this.subNetValueChanges.unsubscribe();
        this.subUsers.unsubscribe();
        this.users = undefined;
        this.nets = undefined;
        this.filteredProcesses = undefined;
    }

    public loadNextUserPage(): void {
        if (!this.viewport) {
            return;
        }
        this.users.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }

    public autoSelectRoles(): void {
        if (!this.nets || !this.userList) {
            return;
        }
        const all = this.userList.selectedOptions.selected.map(option => (option.value as UserListItem).roles);
        if (all.length === 0) {
            this.nets.selectRoles(new Set<string>([]));
            this.nets.markPartialRoles(new Set<string>([]));
            return;
        }
        const intersection = all.reduce((acc, curr) => new Set([...acc].filter(s => curr.has(s))), all[0]);
        const union = all.reduce((acc, curr) => new Set([...acc, ...curr]), new Set<string>());
        this.nets.selectRoles(intersection);
        this.nets.markPartialRoles(new Set([...union].filter(role => !intersection.has(role))));
    }

    /**
     * Adds the role to all selected items (the role was not checked or indeterminate, the checkbox is checked now) or
     * removes it from all of them. The other roles of the items stay.
     */
    public update(role: ExtendedProcessRole): void {
        this.nets.updateSelectedRoles(role);
        const selected = this.userList.selectedOptions.selected.map(option => (option.value as UserListItem));
        this.users.changeRoles(selected, [role.stringId], role.selected).subscribe(_ => {
            this.autoSelectRoles();
        });
    }

    public selectAllUsers(select: boolean): void {
        this.userList.options.forEach(option => {
            (option.value as UserListItem).selected = select;
        });
        this.autoSelectRoles();
    }

    /** adds all roles of the process to the selected items or removes them, the roles of the other processes stay */
    public toggleAllRoles(net: ProcessVersion, select: boolean): void {
        net.roles.forEach(r => {
            r.selected = select;
            this.nets.updateSelectedRoles(r);
        });
        const selected = this.userList.selectedOptions.selected.map(option => (option.value as UserListItem));
        this.users.changeRoles(selected, net.roles.map(r => r.stringId), select).subscribe(_ => {
            this.autoSelectRoles();
        });
    }
}
