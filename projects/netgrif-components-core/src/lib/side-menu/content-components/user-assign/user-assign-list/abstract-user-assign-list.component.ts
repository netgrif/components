import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {UserListItem, UserListService} from '../../../../user/services/user-list.service';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {AbstractBaseUserAssignListComponent} from "../base-user-assign-list/abstract-base-user-assign-list.component";

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'ncc-abstract-user-assign-list',
    template: ''
})
export abstract class AbstractUserAssignListComponent extends AbstractBaseUserAssignListComponent implements OnInit, OnDestroy {

    /**
     * The user that is initially selected, or `undefined` if none is
     */
    @Input() initiallySelectedUser: UserValue | undefined;

    /**
     * Emit selected user to parent component.
     */
    @Output() userSelected: EventEmitter<UserValue>;

    /**
     * UserValue array stream, that represents users loading from backend.
     */
    public users$: Observable<Array<UserListItem>>;
    /**
     * Stream of selected user with his value that we can subscribe to like the observable.
     */
    protected _selectedUser$: ReplaySubject<string>;

    /**
     * Inject and initialize attributes.
     * @param _userListService Service to get paginated loading users from backend.
     */
    constructor(_userListService: UserListService) {
        super(_userListService);
        this.users$ = this._userListService.users$;
        this.userSelected = new EventEmitter();
        this._selectedUser$ = new ReplaySubject<string>(1);
    }

    /**
     * On initialize component set value to stream selectedUser with preselected user.
     * Observes search user control stream on value change.
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.initiallySelectedUser) {
            this._selectedUser$.next(this.initiallySelectedUser.id);
        }
    }

    ngOnDestroy(): void {
        this._selectedUser$.complete();
    }

    /**
     * ID of the currently selected user
     */
    public get selectedUser$(): Observable<string> {
        return this._selectedUser$.asObservable();
    }

    /**
     * Sets current user to the selected user.
     *
     * Emit selected user to parent component.
     *
     * Marks selected user in users list.
     * @param selectedUser [UserValue]{@link UserValue}
     */
    public select(selectedUser: UserListItem): void {
        this.userSelected.emit(new UserValue(selectedUser.id, selectedUser.name, selectedUser.surname, selectedUser.email));
        this._markSelectedUser(selectedUser);
    }

    /**
     * Marks user as selected in users list.
     * @param selectedUser Current select user value.
     */
    protected _markSelectedUser(selectedUser: UserListItem) {
        if (!selectedUser) return;
        this._selectedUser$.next(selectedUser.id);
    }
}
