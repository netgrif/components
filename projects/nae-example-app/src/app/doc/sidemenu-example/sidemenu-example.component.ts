import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
    Net,
    SideMenuService,
    SideMenuSize,
} from '@netgrif/components-core';
import {of} from 'rxjs';
import {NewCaseComponent, UserAssignComponent, FilterSelectorComponent} from '@netgrif/components';

@Component({
    selector: 'nae-app-sidemenu-example',
    templateUrl: './sidemenu-example.component.html',
    styleUrls: ['./sidemenu-example.component.scss'],
    standalone: false
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
        this.sideMenuService.open(NewCaseComponent, SideMenuSize.MEDIUM, {
            allowedNets$: of([new Net({
                stringId: '666',
                authorId: 'testId',
                createdDate: [],
                defaultCaseName: 'test',
                identifier: 'example',
                uriNodeId: 'example',
                immediateData: [],
                title: 'Example Dummy Process',
                version: '1.0.0',
                processRolePermissions: { permissions: {}},
                properties: {map: {"initials": "EXP"}}
            }),
                new Net({
                    stringId: '999',
                    authorId: 'testId',
                    createdDate: [],
                    defaultCaseName: 'test',
                    identifier: 'example',
                    uriNodeId: 'example',
                    immediateData: [],
                    title: 'Other Example Dummy Process',
                    version: '1.0.0',
                    processRolePermissions: { permissions: {}},
                    properties: {map: {"initials": "EXX"}}
                })])
        });
    }

    public toggleUserSideMenu() {
        this.sideMenuService.open(UserAssignComponent);
    }

    public toggleFilterSideMenu() {
        const ref = this.sideMenuService.open(FilterSelectorComponent);
        ref.onEvent.subscribe($event => console.log($event));
    }
}
