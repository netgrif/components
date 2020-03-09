import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../user";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {MatAutocomplete} from "@angular/material";

@Component({
    selector: 'nae-user-assign-list',
    templateUrl: './user-assign-list.component.html',
    styleUrls: ['./user-assign-list.component.scss']
})
export class UserAssignListComponent implements OnInit {

    @Input() userList: User[];
    @Input() control = new FormControl();
    @Output() onUserSelected: EventEmitter<User>;
    @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

    public filteredUserList: Observable<User[]>;
    private _currentUser: User;

    constructor() {
        this.onUserSelected = new EventEmitter();
        this.filteredUserList = this.control.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this._filterUsers(state) : this.userList.slice())
            );
    }

    ngOnInit() {}

    public selected(selectedUser: User): void {
        this._currentUser = selectedUser;
        this.onUserSelected.emit(selectedUser);
        this.userList.map(user => user === selectedUser ? user.selected = true : user.selected = false);
    }

    public isSelected(user: User): boolean {
        if (!user || !this._currentUser) {
            return false;
        }
        return user === this._currentUser;
    }

    private _filterUsers(value: string): User[] {
        const filterValue = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        return this.userList.filter(user => user.fullName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(filterValue) === 0);
    }

}
