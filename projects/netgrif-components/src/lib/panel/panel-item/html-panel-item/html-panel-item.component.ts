import {AfterViewInit, Component, ElementRef, HostBinding, Inject, ViewChild} from '@angular/core';
import {NAE_PANEL_ITEM_DATA, PanelItemPortalData} from '@netgrif/components-core';
import {configurePanelItemLinks, handlePanelItemLinkClick} from '../panel-item-link-click';

@Component({
    selector: 'nc-html-panel-item',
    templateUrl: './html-panel-item.component.html',
    styleUrls: ['./html-panel-item.component.scss']
})
export class HtmlPanelItemComponent implements AfterViewInit {

    @ViewChild('content', {static: true}) private readonly content: ElementRef<HTMLElement>;

    constructor(@Inject(NAE_PANEL_ITEM_DATA) public readonly data: PanelItemPortalData) {
    }

    @HostBinding('class.panel-item-ellipsis')
    public get ellipsis(): boolean {
        return this.data.textEllipsis;
    }

    public ngAfterViewInit(): void {
        configurePanelItemLinks(this.content.nativeElement);
    }

    public handleClick(event: MouseEvent): void {
        handlePanelItemLinkClick(event);
    }
}
