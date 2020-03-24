import {Component, Input, OnInit} from '@angular/core';

export type QuickPanelItem = 'language' | 'settings' | 'logout' | 'more';

@Component({
    selector: 'nae-app-quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent implements OnInit {

    @Input() public items: Array<QuickPanelItem>;

    constructor() {
    }

    ngOnInit(): void {
    }

}
