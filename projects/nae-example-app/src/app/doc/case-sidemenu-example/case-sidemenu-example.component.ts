import {Component, OnInit} from '@angular/core';
import {SideMenuService, NewCaseComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-case-sidemenu-example',
    templateUrl: './case-sidemenu-example.component.html',
    styleUrls: ['./case-sidemenu-example.component.scss']
})
export class CaseSidemenuExampleComponent implements OnInit {
    readonly TITLE = 'New Case SideMenu';
    readonly DESCRIPTION = 'Ukážka použitia New case sidemenu...';

    constructor(private sideMenuService: SideMenuService) {
    }

    ngOnInit(): void {
    }

    public toggleSideMenu() {
        this.sideMenuService.open(NewCaseComponent);
    }
}
