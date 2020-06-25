import {Component, Input, OnInit} from '@angular/core';
import {UserValue} from '../../../../../data-fields/user-field/models/user-value';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'nae-user-assign-item',
  templateUrl: './user-assign-item.component.html',
  styleUrls: ['./user-assign-item.component.scss']
})
export class UserAssignItemComponent implements OnInit {

    @Input() user: UserValue;
    @Input() selectedUser$: BehaviorSubject<UserValue>;
    @Input() first: boolean;
    @Input() last: boolean;

    constructor() {
    }

    ngOnInit() {
        this.selectedUser$.subscribe(user => { if (user) this.user.selected = this.user.id === user.id; });
    }
}
