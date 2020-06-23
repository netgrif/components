import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatAutocomplete} from '@angular/material';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {UserAssignService} from '../service/user-assign.service';
import {UserAssignInjectedData} from '../model/user-assign-injected-data';

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
    public readonly PAGE_SIZE: number;
    private _currentUser: UserValue;

    constructor(private _userAssignService: UserAssignService) {
        this.users$ = this._userAssignService.users$;
        this.loading$ = this._userAssignService.loading$;
        this.userSelected = new EventEmitter();
        this.PAGE_SIZE = this._userAssignService.PAGE_SIZE;
    }

    ngOnInit() {
        this.markSelectedUser(this.injectedData.value);
        // this.users$ = this.searchUserControl.valueChanges.pipe(
        //     startWith(''),
        //     map(searchQuery => this._filterUsers(searchQuery))
        // );
    }

    public select(selectedUser: UserValue): void {
        this._currentUser = selectedUser;
        this.userSelected.emit(selectedUser);
        this.markSelectedUser(selectedUser);
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

    private markSelectedUser(selectedUser: UserValue) {
        if (!selectedUser) return;
        this.users$ = this.users$.pipe(
            map(users => {
                if (users && users.length > 0) {
                    users.forEach(user => user.selected = user.id === selectedUser.id);
                    return users;
                }
            })
        );
    }

    // private _filterUsers(searchQuery: string): Array<UserValue> {
    //     const filterValue = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    //     const filteredUsers = [];
    //     this.users$.pipe(
    //         map(users => {
    //             users.forEach(user => {
    //                 if (user.fullName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0) {
    //                     filteredUsers.push(user);
    //                 } else if (searchQuery === '') {
    //                     filteredUsers.push(user);
    //                 }
    //             });
    //         })
    //     );
    //     return filteredUsers;
    // }

}
