import {Component, Input, OnInit} from '@angular/core';

export type QuickPanelItem = 'language' | 'settings' | 'logout';

@Component({
    selector: 'nae-quick-panel',
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
