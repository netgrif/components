import {Component, Inject} from '@angular/core';
import {NAE_PANEL_ITEM_DATA, PanelItemPortalData} from 'netgrif-components-core';

@Component({
    selector: 'nae-enumeration-value-panel-item',
    templateUrl: './enumeration-value-panel-item.component.html',
    styleUrls: ['./enumeration-value-panel-item.component.scss']
})
export class EnumerationValuePanelItemComponent {
    public readonly backgroundColor: string | undefined;
    public readonly color: string | undefined;

    constructor(@Inject(NAE_PANEL_ITEM_DATA) public readonly data: PanelItemPortalData) {
        const optionKey = this.resolveOptionKey(data.featuredValue.rawValue);
        this.backgroundColor = this.resolveStyleProperty(optionKey, 'background');
        this.color = this.resolveStyleProperty(optionKey, 'color');
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

    private resolveStyleProperty(optionKey: string | undefined, property: string): string | undefined {
        const properties = this.data.featuredValue.component?.properties;
        return optionKey ? properties?.[`${optionKey}-${property}`] ?? properties?.[property] : properties?.[property];
    }
}
