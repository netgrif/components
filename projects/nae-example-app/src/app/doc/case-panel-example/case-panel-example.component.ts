import {Component, OnInit} from '@angular/core';
import {CasePanelDefinition} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-case-panel-example',
    templateUrl: './case-panel-example.component.html',
    styleUrls: ['./case-panel-example.component.scss']
})
export class CasePanelExampleComponent implements OnInit {
    readonly TITLE = 'Case panel';
    readonly DESCRIPTION = 'Ukážka použitia case panelu...';
    casePanelDef: CasePanelDefinition;

    constructor() {
        this.casePanelDef = {featuredFields : [], panelIcon: 'home', panelIconField: 'home'};
    }

    ngOnInit(): void {
    }

}
