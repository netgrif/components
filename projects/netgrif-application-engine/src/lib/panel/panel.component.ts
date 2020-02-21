import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'nae-app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

    @Input() expansionDisabled = false;
    @Input() preventExpand = false;
    @Input() panelHeader: TemplateRef<object>;
    @Input() panelContent: TemplateRef<object>;
    @Output() stopLoading: EventEmitter<object> = new EventEmitter();
    @ViewChild('matExpansionPanel') _matExpansionPanel;

    constructor() {
    }

    ngOnInit() {
    }

    emitExpand() {
        this.stopLoading.emit();
    }

    emitCollapse() {
        this.stopLoading.emit();
    }

    expandPanel() {
        if (this.preventExpand) {
            this._matExpansionPanel.close()
        }
    }

}
