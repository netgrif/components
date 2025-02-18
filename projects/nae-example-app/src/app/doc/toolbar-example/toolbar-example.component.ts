import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToolbarConfig} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-toolbar-example',
    templateUrl: './toolbar-example.component.html',
    styleUrls: ['./toolbar-example.component.scss']
})
export class ToolbarExampleComponent implements OnInit {
    readonly TITLE = 'Toolbar';
    readonly DESCRIPTION = 'Ukážka toolbaru...';

    public toolbarConfig: ToolbarConfig = {
        profileEnabled: false,
        languageEnabled: false,
        logoutEnabled: false,
        simpleToolbar: true,
        toolbarName: {
            defaultValue: "Netgrif",
            translations: {}
        },
        toolbarLogo: "assets/img/netgrif_full_white.svg"
    };

    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }
}
