import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {NAE_PANEL_ITEM_DATA, PanelItemPortalData} from '@netgrif/components-core';
import {configurePanelItemLinks, extractPanelItemText, handlePanelItemLinkClick} from '../panel-item-link-click';

@Component({
    selector: 'nc-markdown-panel-item',
    templateUrl: './markdown-panel-item.component.html',
    styleUrls: ['./markdown-panel-item.component.scss']
})
export class MarkdownPanelItemComponent implements AfterViewInit {

    @ViewChild('content', {static: true}) private readonly content: ElementRef<HTMLElement>;
    public tooltipText = '';

    constructor(@Inject(NAE_PANEL_ITEM_DATA) public readonly data: PanelItemPortalData,
                private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    public ngAfterViewInit(): void {
        this.configureLinks();
    }

    public configureLinks(): void {
        configurePanelItemLinks(this.content.nativeElement);
        this.tooltipText = extractPanelItemText(this.content.nativeElement);
        this.changeDetectorRef.detectChanges();
    }

    public handleClick(event: MouseEvent): void {
        handlePanelItemLinkClick(event);
    }
}
