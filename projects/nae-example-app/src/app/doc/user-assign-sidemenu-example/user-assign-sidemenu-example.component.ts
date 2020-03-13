import {Component, OnInit} from '@angular/core';
import {SideMenuService, UserAssignComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-user-assign-sidemenu-example',
    templateUrl: './user-assign-sidemenu-example.component.html',
    styleUrls: ['./user-assign-sidemenu-example.component.scss']
})
export class UserAssignSidemenuExampleComponent implements OnInit {
    readonly TITLE = 'User Assign SideMenu';
    readonly DESCRIPTION = 'Ukážka použitia user assign sidemenu...';

    constructor(private sideMenuService: SideMenuService) {
    }

    ngOnInit(): void {
    }

    public toggleSideMenu() {
        this.sideMenuService.open(UserAssignComponent);
    }
}
