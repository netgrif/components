import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nae-app-toolbar-example',
    templateUrl: './toolbar-example.component.html',
    styleUrls: ['./toolbar-example.component.scss'],
    standalone: false
})
export class ToolbarExampleComponent implements OnInit {
    readonly TITLE = 'Toolbar';
    readonly DESCRIPTION = 'Ukážka toolbaru...';

    logoSrc = 'assets/img/netgrif_full_white.svg';
    logoAlt = 'Netgrif';

    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }
}
