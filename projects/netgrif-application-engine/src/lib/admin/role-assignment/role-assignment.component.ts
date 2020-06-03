import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectionList} from '@angular/material';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {RoleAssignmentService} from './services/role-assignment.service';
import {UserList, UserListItem} from './services/UserList';
import {ProcessList} from './services/ProcessList';

@Component({
    selector: 'nae-role-assignment',
    templateUrl: './role-assignment.component.html',
    styleUrls: ['./role-assignment.component.scss'],
    providers: [
        RoleAssignmentService
    ]
})
export class RoleAssignmentComponent implements OnInit {

    @ViewChild('userList') public userList: MatSelectionList;
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    public users: UserList;
    public nets: ProcessList;

    constructor(private _service: RoleAssignmentService) {
        this.users = this._service.userList;
        this.nets = this._service.processList;
    }

    ngOnInit(): void {
        this.nets.loadProcesses();
    }

    public loadNextUserPage(): void {
        if (!this.viewport) {
            return;
        }
        this.users.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }

    public autoSelectRoles(user: UserListItem): void {
        const all = this.userList.selectedOptions.selected.map(option => (option.value as UserListItem).roles);
        if (all.length === 0) {
            this.nets.selectRoles(new Set<string>([]));
        }
        const intersection = all.reduce((acc, curr) => new Set([...acc].filter(s => curr.has(s))), all[0]);
        this.nets.selectRoles(intersection);
    }

    public update(): void {
        const selected = this.userList.selectedOptions.selected.map(option => (option.value as UserListItem).id);
        this.users.updateRoles(selected, this.nets.selectedRoles);
    }

}
