import { Component } from '@angular/core';
import {AbstractMultiUserAssignItemComponent} from '@netgrif/components-core';

@Component({
  selector: 'nc-multi-user-assign-item',
  templateUrl: './multi-user-assign-item.component.html',
  styleUrls: ['./multi-user-assign-item.component.scss'],
    standalone: false
})
export class MultiUserAssignItemComponent extends AbstractMultiUserAssignItemComponent {

    constructor() {
        super();
    }

}
