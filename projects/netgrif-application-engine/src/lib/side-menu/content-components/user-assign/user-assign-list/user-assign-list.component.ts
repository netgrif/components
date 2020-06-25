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

@Component({
    selector: 'nae-user-assign-list',
    templateUrl: './user-assign-list.component.html',
    styleUrls: ['./user-assign-list.component.scss']
})
export class UserAssignListComponent implements OnInit {

    @Input() searchUserControl: FormControl;
    @Input() injectedData: UserAssignInjectedData;

    @Output() userSelected: EventEmitter<UserValue>;

    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    public users$: Observable<Array<UserValue>>;
    public loading$: Observable<boolean>;
    public selectedUser$: BehaviorSubject<UserValue>;
    public readonly PAGE_SIZE: number;

    private _currentUser: UserValue;

    constructor(private _userAssignService: UserAssignService) {
        this.users$ = this._userAssignService.users$;
        this.loading$ = this._userAssignService.loading$;
        this.userSelected = new EventEmitter();
        this.PAGE_SIZE = this._userAssignService.PAGE_SIZE;
    }

    ngOnInit() {
        this.selectedUser$ = new BehaviorSubject<UserValue>(this.injectedData.value ? this.injectedData.value : null);
        this.searchUserControl.valueChanges.subscribe(searchQuery => this._filterUsers(searchQuery));
    }

    public select(selectedUser: UserValue): void {
        this._currentUser = selectedUser;
        this.userSelected.emit(selectedUser);
        this._markSelectedUser(selectedUser);
    }

    public isSelected(user: UserValue): boolean {
        if (!user || !this._currentUser) {
            return false;
        }
        return user === this._currentUser;
    }

    public trackBy(i): any {
        return i;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._userAssignService.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }

    private _markSelectedUser(selectedUser: UserValue) {
        if (!selectedUser) return;
        this.selectedUser$.next(selectedUser);
    }

    private _filterUsers(searchQuery: string): void {
        this.users$ = this.users$.pipe(
            map(users => users.filter((user: UserValue) => (StringUtil.removeAccentAndCaseSensitive(user.fullName)
                    .indexOf(StringUtil.removeAccentAndCaseSensitive(searchQuery)) === 0) || searchQuery === ''))
        );
    }
}
