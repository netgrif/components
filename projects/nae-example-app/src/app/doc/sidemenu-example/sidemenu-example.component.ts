import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NewCaseComponent, SideMenuService, UserAssignComponent, FilterSelectorComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-sidemenu-example',
    templateUrl: './sidemenu-example.component.html',
    styleUrls: ['./sidemenu-example.component.scss']
})
export class SidemenuExampleComponent implements OnInit {
    readonly TITLE = 'SideMenu';
    readonly DESCRIPTION = 'Ukážka použitia SideMenu...';

    @ViewChild('templatePortal') templatePortal: TemplateRef<any>;

    constructor(private sideMenuService: SideMenuService) {
    }

    ngOnInit(): void {
    }

    public toggleSideMenu() {
        this.sideMenuService.open(this.templatePortal);
    }

    public toggleCaseSideMenu() {
        this.sideMenuService.open(NewCaseComponent);
    }

    public toggleUserSideMenu() {
        this.sideMenuService.open(UserAssignComponent);
    }

    public toggleFilterSideMenu() {
        const ref = this.sideMenuService.open(FilterSelectorComponent);
        ref.onEvent.subscribe($event => console.log($event));
    }
}
