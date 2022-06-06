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
    selector: 'ncc-abstract-user-assign-list',
    template: ''
})
export abstract class AbstractUserAssignListComponent implements OnInit, OnDestroy {

    /**
     * The time that must elapse since last keypress in search input before a search request is sent
     */
    protected SEARCH_DEBOUNCE_TIME = 600;

    /**
     * The user that is initially selected, or `undefined` if none is
     */
    @Input() initiallySelectedUser: UserValue | undefined;

    /**
     * Search user form control from parent component.
     */
    @Input() searchUserControl: FormControl;

    /**
     * Roles for user search
     */
    @Input() roles: RolesObject | Array<string>;

    /**
     * Negative Roles for user search
     */
    @Input() negativeRoles: RolesObject | Array<string>;

    /**
     * Emit selected user to parent component.
     */
    @Output() userSelected: EventEmitter<UserValue>;

    /**
     * Viewport reference to virtual scroll.
     */
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

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
    constructor(protected _userListService: UserListService) {
        this.users$ = this._userListService.users$;
        this.userSelected = new EventEmitter();
        this._selectedUser$ = new ReplaySubject<string>(1);
    }

    /**
     * On initialize component set value to stream selectedUser with preselected user.
     * Observes search user control stream on value change.
     */
    ngOnInit() {
        if (this.initiallySelectedUser) {
            this._selectedUser$.next(this.initiallySelectedUser.id);
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
        this._selectedUser$.complete();
    }

    public trackBy(index: number, item: UserValue): any {
        return item.id;
    }

    public get loading(): boolean {
        return this._userListService.loading;
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
     * Load next page after scroll at end in cdkVirtualScroll element.
     */
    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._userListService.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
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
