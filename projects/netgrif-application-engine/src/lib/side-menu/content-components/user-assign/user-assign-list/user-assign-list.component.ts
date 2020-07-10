import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {Observable, ReplaySubject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {UserAssignService} from '../service/user-assign.service';
import {debounceTime} from 'rxjs/operators';

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'nae-user-assign-list',
    templateUrl: './user-assign-list.component.html',
    styleUrls: ['./user-assign-list.component.scss']
})
export class UserAssignListComponent implements OnInit, OnDestroy {

    /**
     * The time that must elapse since last keypress in search input before a search request is sent
     */
    private SEARCH_DEBOUNCE_TIME = 200;

    /**
     * The user that is initially selected, or `undefined` if none is
     */
    @Input() initiallySelectedUser: UserValue | undefined;

    /**
     * Search user form control from parent component.
     */
    @Input() searchUserControl: FormControl;

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
     * Stream of selected user with his value that we can subscribe to like the observable.
     */
    private _selectedUser$: ReplaySubject<string>;

    /**
     * Inject and initialize attributes.
     * @param _userAssignService Service to get paginated loading users from backend.
     */
    constructor(private _userAssignService: UserAssignService) {
        this.users$ = this._userAssignService.users$;
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
            this._userAssignService.reload(searchText);
        });
    }

    ngOnDestroy(): void {
        this._selectedUser$.complete();
    }

    public trackBy(index: number, item: UserValue): any {
        return item.id;
    }

    public get loading(): boolean {
        return this._userAssignService.loading;
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
    public select(selectedUser: UserValue): void {
        this.userSelected.emit(selectedUser);
        this._markSelectedUser(selectedUser);
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
        this._selectedUser$.next(selectedUser.id);
    }
}
