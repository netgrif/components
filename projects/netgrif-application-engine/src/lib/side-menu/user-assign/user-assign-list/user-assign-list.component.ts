import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatAutocomplete} from '@angular/material';

@Component({
    selector: 'nae-user-assign-list',
    templateUrl: './user-assign-list.component.html',
    styleUrls: ['./user-assign-list.component.scss']
})
export class UserAssignListComponent implements OnInit {

    @Input() userList: UserValue[];
    @Input() control = new FormControl();
    @Output() userSelected: EventEmitter<UserValue>;
    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    public filteredUserList: Observable<UserValue[]>;
    private _currentUser: UserValue;

    constructor() {
        this.userSelected = new EventEmitter();
        this.filteredUserList = this.control.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this._filterUsers(state) : this.userList.slice())
            );
    }

    ngOnInit() {}

    public selected(selectedUser: UserValue): void {
        this._currentUser = selectedUser;
        this.userSelected.emit(selectedUser);
        this.userList.map(user => user === selectedUser ? user.selected = true : user.selected = false);
    }

    public isSelected(user: UserValue): boolean {
        if (!user || !this._currentUser) {
            return false;
        }
        return user === this._currentUser;
    }

    private _filterUsers(value: string): UserValue[] {
        const filterValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return this.userList.filter(user => user.fullName.toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
    }

}
