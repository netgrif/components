import {AfterViewInit, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

export abstract class AbstractPanelComponent implements AfterViewInit, OnDestroy {

    @Input() expansionDisabled = false;
    @Input() preventExpand = false;
    @Input() panelHeader: TemplateRef<object>;
    @Input() panelContent: TemplateRef<object>;
    @Input() first: boolean;
    @Input() last: boolean;

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
}
