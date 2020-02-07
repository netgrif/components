import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'nae-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

    @Input() featuredFields: Array<string>;
    @Input() panelIcon: string;
    @Input() expansionDisabled = false;
    public showSpinner = false;

    constructor() {
    }

    ngOnInit() {
    }

    show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

}
