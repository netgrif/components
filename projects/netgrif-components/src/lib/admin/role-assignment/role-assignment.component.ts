import {Component} from '@angular/core';
import {AbstractRoleAssignment, RoleAssignmentService, UserService} from '@netgrif/components-core';

@Component({
    selector: 'nc-role-assignment',
    templateUrl: './role-assignment.component.html',
    styleUrls: ['./role-assignment.component.scss'],
    providers: [
        RoleAssignmentService
    ]
})
export class RoleAssignmentComponent extends AbstractRoleAssignment {
    constructor(protected _service: RoleAssignmentService, protected _userService: UserService) {
        super(_service, _userService);
    }
}
