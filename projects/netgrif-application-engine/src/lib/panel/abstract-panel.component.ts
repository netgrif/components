import {AfterViewInit, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

export abstract class AbstractPanelComponent implements AfterViewInit, OnDestroy {

    @Input() expansionDisabled = false;
    @Input() preventExpand = false;
    @Input() panelHeader: TemplateRef<object>;
    @Input() panelContent: TemplateRef<object>;
    @Input() first: boolean;
    @Input() last: boolean;
    @Input() public caseColor: string;

    @Output() stopLoading: EventEmitter<object> = new EventEmitter();
    @Output() getExpansionPanelRef: EventEmitter<MatExpansionPanel> = new EventEmitter();

    @ViewChild('matExpansionPanel') matExpansionPanel;

    protected constructor() {
    }

    ngOnDestroy(): void {
        this.stopLoading.complete();
        this.getExpansionPanelRef.complete();
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

    computeCaseFontColor(): string {
        //check if hex color
        if(!(/^#[0-9A-F]{6}$/i.exec(this.caseColor))) return 'black'
        var m = this.caseColor.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
        let r = parseInt(m[1], 16);
        let g = parseInt(m[2], 16);
        let b = parseInt(m[3], 16);
        //možné špecifickejšie upraviť threshold hodnotu
        return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 150) ?
            'black' : 'white';
    }
}
