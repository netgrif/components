import {Component, Inject} from '@angular/core';
import {Icon, NAE_PANEL_ITEM_DATA, PanelItemPortalData} from '@netgrif/components-core';

@Component({
    selector: 'nc-enumeration-icon-panel-item',
    templateUrl: './enumeration-icon-panel-item.component.html',
    styleUrls: ['./enumeration-icon-panel-item.component.scss']
})
export class EnumerationIconPanelItemComponent {

    public readonly icon: Icon | undefined;

    constructor(@Inject(NAE_PANEL_ITEM_DATA) public readonly data: PanelItemPortalData) {
        const optionKey = this.resolveOptionKey(data.featuredValue.rawValue);
        this.icon = data.featuredValue.component?.optionIcons?.find(optionIcon =>
            optionIcon.key === optionKey);
    }

    private resolveOptionKey(rawValue: unknown): string | undefined {
        if (typeof rawValue === 'string') {
            return rawValue;
        }
        if (rawValue && typeof rawValue === 'object' && 'defaultValue' in rawValue
            && typeof rawValue.defaultValue === 'string') {
            return rawValue.defaultValue;
        }
        return undefined;
    }
}
