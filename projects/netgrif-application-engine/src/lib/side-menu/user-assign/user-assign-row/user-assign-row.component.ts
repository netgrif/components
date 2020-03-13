import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';

@Component({
    selector: 'nae-user-assign-row',
    templateUrl: './user-assign-row.component.html',
    styleUrls: ['./user-assign-row.component.scss']
})
export class UserAssignRowComponent implements OnInit {

    @Input() user: User;

    constructor() {
    }

    ngOnInit() {
    }

}
