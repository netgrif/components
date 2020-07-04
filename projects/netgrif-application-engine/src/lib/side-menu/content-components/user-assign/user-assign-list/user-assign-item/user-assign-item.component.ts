import {Component, Input, OnInit} from '@angular/core';
import {UserValue} from '../../../../../data-fields/user-field/models/user-value';
import {BehaviorSubject} from 'rxjs';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
  selector: 'nae-user-assign-item',
  templateUrl: './user-assign-item.component.html',
  styleUrls: ['./user-assign-item.component.scss']
})
export class UserAssignItemComponent implements OnInit {
    /**
     * Value of the current user.
     */
    @Input() user: UserValue;
    /**
     * Stream of selected user that we can subscribe to like the observable.
     *
     * Still returns the [UserValue]{@link UserValue}
     * when set in the [UserAssignListComponent]{@link UserAssignListComponent} after selection.
     */
    @Input() selectedUser$: BehaviorSubject<UserValue>;
    /**
     * This is the first item in the user assign list source for CdkVirtualScrollViewport.
     */
    @Input() first: boolean;
    /**
     * This is the last item in the user assign list source for CdkVirtualScrollViewport.
     */
    @Input() last: boolean;

    constructor() {
    }

    /**
     * On initialize this item component observe on selectedUser stream.
     * If own user id is equals with user id set in stream, then set current user as select user.
     */
    ngOnInit() {
        this.selectedUser$.subscribe(user => { if (user) this.user.selected = this.user.id === user.id; });
    }
}
