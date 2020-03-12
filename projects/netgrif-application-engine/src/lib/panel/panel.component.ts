import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
    selector: 'nae-app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

    @Input() expansionDisabled = false;
    @Input() preventExpand = false;
    @Input() panelHeader: TemplateRef<object>;
    @Input() panelContent: TemplateRef<object>;
    @Output() stopLoading: EventEmitter<object> = new EventEmitter();
    @Output() getExpansionPanelRef: EventEmitter<MatExpansionPanel> = new EventEmitter();
    @ViewChild('matExpansionPanel') matExpansionPanel;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getExpansionPanelRef.emit(this.matExpansionPanel);
    }

    emitExpand() {
        this.stopLoading.emit();
    }

    emitCollapse() {
        this.stopLoading.emit();
    }

    expandPanel() {
        if (this.preventExpand) {
            this.matExpansionPanel.close();
        }
    }

}
