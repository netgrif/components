import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatAutocomplete} from '@angular/material';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {UserAssignService} from '../service/user-assign.service';
import {UserAssignInjectedData} from '../model/user-assign-injected-data';
import StringUtil from '../../../../utility/string/string-util';
import {map} from 'rxjs/operators';

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'nae-user-assign-list',
    templateUrl: './user-assign-list.component.html',
    styleUrls: ['./user-assign-list.component.scss']
})
export class UserAssignListComponent implements OnInit {
    /**
     * Search user form control from parent component.
     */
    @Input() searchUserControl: FormControl;

    /**
     * Injected user value data from parent component.
     */
    @Input() injectedData: UserAssignInjectedData;

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
    public users$: Observable<Array<UserValue>>;
    /**
     * Signalized users loading status from backend.
     */
    public loading$: Observable<boolean>;
    /**
     * Stream of selected user with his value that we can subscribe to like the observable.
     */
    public selectedUser$: BehaviorSubject<UserValue>;

    /**
     * Current selected user.
     */
    private _currentUser: UserValue;

    /**
     * Inject and initialize attributes.
     * @param _userAssignService Service to get paginated loading users from backend.
     */
    constructor(private _userAssignService: UserAssignService) {
        this.users$ = this._userAssignService.users$;
        this.loading$ = this._userAssignService.loading$;
        this.userSelected = new EventEmitter();
    }

    /**
     * On initialize component set value to stream selectedUser with preselected user.
     * Observes search user control stream on value change.
     */
    ngOnInit() {
        this.selectedUser$ = new BehaviorSubject<UserValue>(this.injectedData.value ? this.injectedData.value : null);
        this.searchUserControl.valueChanges.subscribe(searchQuery => this._filterUsers(searchQuery));
    }

    /**
     * Sets current user to the selected user.
     *
     * Emit selected user to parent component.
     *
     * Marks selected user in users list.
     * @param selectedUser [UserValue]{@link UserValue}
     */
    public select(selectedUser: UserValue): void {
        this._currentUser = selectedUser;
        this.userSelected.emit(selectedUser);
        this._markSelectedUser(selectedUser);
    }

    /**
     * Checked if user is selected.
     * @param user [UserValue]{@link UserValue}
     */
    public isSelected(user: UserValue): boolean {
        if (!user || !this._currentUser) {
            return false;
        }
        return user === this._currentUser;
    }

    /**
     * Track cdkVirtualScrollFor by [UserValue]{@link UserValue}
     * @param i [UserValue]{@link UserValue}
     */
    public trackBy(i): any {
        return i;
    }

    /**
     * Load next page after scroll at end in cdkVirtualScroll element.
     */
    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._userAssignService.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }

    /**
     * Marks user as selected in users list.
     * @param selectedUser Current select user value.
     */
    private _markSelectedUser(selectedUser: UserValue) {
        if (!selectedUser) return;
        this.selectedUser$.next(selectedUser);
    }

    /**
     * Filters users stream by input searchQuery parameter without accent and case sensitivity.
     * @param searchQuery Unhandled text from users search bar.
     */
    private _filterUsers(searchQuery: string): void {
        this.users$ = this.users$.pipe(
            map(users => users.filter((user: UserValue) => (StringUtil.removeAccentAndCaseSensitivity(user.fullName)
                .indexOf(StringUtil.removeAccentAndCaseSensitivity(searchQuery)) === 0) || searchQuery === ''))
        );
    }
}
