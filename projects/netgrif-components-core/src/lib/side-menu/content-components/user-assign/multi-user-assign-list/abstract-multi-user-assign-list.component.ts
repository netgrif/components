import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {debounceTime} from 'rxjs/operators';
import {RolesObject, UserListItem, UserListService} from '../../../../user/services/user-list.service';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'ncc-abstract-multi-user-assign-list',
    template: ''
})
export abstract class AbstractMultiUserAssignListComponent implements OnInit, OnDestroy {

    protected SEARCH_DEBOUNCE_TIME = 600;

    @Input() initiallySelectedUsers: Array<UserValue> | undefined;

    @Input() searchUserControl: FormControl;

    @Input() roles: RolesObject | Array<string>;

    @Input() negativeRoles: RolesObject | Array<string>;

    @Output() userSelected: EventEmitter<UserValue>;

    @Output() userUnselected: EventEmitter<UserValue>;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    public users$: Observable<Array<UserListItem>>;

    protected _selectedUsers$: ReplaySubject<Array<string>>;

    protected _currentlySelectedUsers: Array<string>;

    constructor(protected _userListService: UserListService) {
        this.users$ = this._userListService.users$;
        this.userSelected = new EventEmitter<UserValue>();
        this.userUnselected = new EventEmitter<UserValue>();
        this._selectedUsers$ = new ReplaySubject<Array<string>>(1);
        this._currentlySelectedUsers = new Array<string>();
    }

    ngOnInit() {
        if (this.initiallySelectedUsers) {
            this._selectedUsers$.next(this.initiallySelectedUsers.map(v => v.id));
            this._currentlySelectedUsers.push(...this.initiallySelectedUsers.map(v => v.id));
        }
        this.searchUserControl.valueChanges.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME)).subscribe(searchText => {
            this._userListService.reload(searchText);
        });
        if (this.roles instanceof Array) {
            this._userListService.rolesQuery = this.roles;
        } else if (this.roles !== undefined && this.roles !== null) {
            this._userListService.rolesQuery = Object.keys(this.roles);
        }
        if (this.negativeRoles instanceof Array) {
            this._userListService.negativeRolesQuery = this.negativeRoles;
        } else if (this.negativeRoles !== undefined && this.negativeRoles !== null) {
            this._userListService.negativeRolesQuery = Object.keys(this.negativeRoles);
        }
    }

    ngOnDestroy(): void {
        this._selectedUsers$.complete();
    }

    public get selectedUsers$(): Observable<Array<string>> {
        return this._selectedUsers$.asObservable();
    }

    public get currentlySelectedUsers(): string[] {
        return this._currentlySelectedUsers;
    }

    public trackBy(index: number, item: UserValue): any {
        return item.id;
    }

    public get loading(): boolean {
        return this._userListService.loading;
    }

    public select(selectedUser: UserListItem): void {
        const index = this._currentlySelectedUsers.indexOf(selectedUser.id, 0);
        if (index > -1) {
            this._currentlySelectedUsers.splice(index, 1);
            this.userUnselected.emit(new UserValue(selectedUser.id, selectedUser.name, selectedUser.surname, selectedUser.email));
        } else {
            this._currentlySelectedUsers.push(selectedUser.id);
            this.userSelected.emit(new UserValue(selectedUser.id, selectedUser.name, selectedUser.surname, selectedUser.email));
        }
        this._selectedUsers$.next([...this._currentlySelectedUsers]);
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._userListService.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }
}
