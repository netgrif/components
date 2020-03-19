import {Component, Input, OnInit} from '@angular/core';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';

@Component({
  selector: 'nae-user-assign-item',
  templateUrl: './user-assign-item.component.html',
  styleUrls: ['./user-assign-item.component.scss']
})
export class UserAssignItemComponent implements OnInit {

    @Input() user: UserValue;

    constructor() {
    }

    ngOnInit() {
    }
}
