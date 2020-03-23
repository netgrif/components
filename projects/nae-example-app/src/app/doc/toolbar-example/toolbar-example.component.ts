import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-toolbar-example',
    templateUrl: './toolbar-example.component.html',
    styleUrls: ['./toolbar-example.component.scss']
})
export class ToolbarExampleComponent implements OnInit {
    readonly TITLE = 'Toolbar';
    readonly DESCRIPTION = 'Ukážka použitia Toolbaru...';

    logoSrc = 'assets/img/netgrif_full_white.svg';
    logoAlt = 'Netgrif';

    constructor() {
    }

    ngOnInit(): void {
    }

}
