import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../data-fields/user-field/models/user';

@Component({
  selector: 'nae-user-assign-item',
  templateUrl: './user-assign-item.component.html',
  styleUrls: ['./user-assign-item.component.scss']
})
export class UserAssignItemComponent implements OnInit {

    @Input() user: User;

    constructor() {
    }

    ngOnInit() {
    }
}
