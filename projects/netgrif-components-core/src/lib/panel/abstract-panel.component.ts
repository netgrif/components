import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {CaseListFontColorService} from '../utility/service/case-list-font-color.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigParams } from './configuration/config-params';

@Component({
    selector: 'ncc-abstract-panel',
    template: ''
})
export abstract class AbstractPanelComponent implements AfterViewInit, OnDestroy {

    config: Params;
    @Input() expansionDisabled = false;
    @Input() preventExpand = false;
    @Input() preventCollapse = false;
    @Input() hidePanelHeader = false;
    @Input() panelHeader: TemplateRef<object>;
    @Input() panelContent: TemplateRef<object>;
    @Input() first: boolean;
    @Input() last: boolean;
    @Input() public caseColor: string;

    @Output() stopLoading: EventEmitter<object> = new EventEmitter();
    @Output() getExpansionPanelRef: EventEmitter<MatExpansionPanel> = new EventEmitter();

    @ViewChild('matExpansionPanel') matExpansionPanel;

    protected constructor(protected _caseListFontColorService: CaseListFontColorService,
                          protected _activatedRoute?: ActivatedRoute) {
        if (!!_activatedRoute) {
            this._activatedRoute.queryParams.subscribe(paramMap => this.config = paramMap);
        }
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

    showPanelHeader(): boolean {
        if (!!this.hidePanelHeader) {
            return false;
        }
        return !(this.config?.[ConfigParams.PANEL_HEADER] === 'false')
    }

    getCaseFontColor(): string {
        return this._caseListFontColorService.computeCaseFontColor(this.caseColor);
    }
}
