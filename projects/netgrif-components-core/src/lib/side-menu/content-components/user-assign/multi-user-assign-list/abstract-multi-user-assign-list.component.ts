import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {UserListItem, UserListService} from '../../../../user/services/user-list.service';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {AbstractBaseUserAssignListComponent} from "../base-user-assign-list/abstract-base-user-assign-list.component";

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'ncc-abstract-multi-user-assign-list',
    template: ''
})
export abstract class AbstractMultiUserAssignListComponent extends AbstractBaseUserAssignListComponent implements OnInit, OnDestroy {

    @Input() initiallySelectedUsers: Array<UserValue> | undefined;

    @Output() userSelected: EventEmitter<UserValue>;

    @Output() userUnselected: EventEmitter<UserValue>;


    public users$: Observable<Array<UserListItem>>;

    protected _selectedUsers$: ReplaySubject<Array<string>>;

    protected _currentlySelectedUsers: Array<string>;

    constructor(_userListService: UserListService) {
        super(_userListService);
        this.users$ = this._userListService.users$;
        this.userSelected = new EventEmitter<UserValue>();
        this.userUnselected = new EventEmitter<UserValue>();
        this._selectedUsers$ = new ReplaySubject<Array<string>>(1);
        this._currentlySelectedUsers = new Array<string>();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.initiallySelectedUsers) {
            this._selectedUsers$.next(this.initiallySelectedUsers.map(v => v.id));
            this._currentlySelectedUsers.push(...this.initiallySelectedUsers.map(v => v.id));
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

    public select(selectedUser: UserListItem): void {
        const index = this._currentlySelectedUsers.indexOf(selectedUser.id);
        if (index > -1) {
            this._currentlySelectedUsers.splice(index, 1);
            this.userUnselected.emit(new UserValue(selectedUser.id, selectedUser.name, selectedUser.surname, selectedUser.email));
        } else {
            this._currentlySelectedUsers.push(selectedUser.id);
            this.userSelected.emit(new UserValue(selectedUser.id, selectedUser.name, selectedUser.surname, selectedUser.email));
        }
        this._selectedUsers$.next([...this._currentlySelectedUsers]);
    }
}
