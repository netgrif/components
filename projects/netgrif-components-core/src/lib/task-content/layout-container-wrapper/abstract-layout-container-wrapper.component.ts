import {Component, Input} from '@angular/core';
import {LayoutContainer} from '../../resources/interface/layout-container';
import {LayoutItem} from '../../resources/interface/layout-item';
import {LayoutObjectType} from '../../resources/types/layout-object-type';

@Component({
    selector: 'ncc-abstract-layout-container-wrapper',
    template: ''
})
export abstract class AbstractLayoutContainerWrapperComponent {

    @Input() public layoutContainerContent: LayoutContainer;

    protected constructor() {
    }

    public getWrapperStyle(layoutObject: LayoutContainer | LayoutItem): string {
        let cssStyle = "";
        if (!layoutObject || !layoutObject.properties) {
            return cssStyle;
        }
        Object.entries(layoutObject.properties).forEach(([key, value]) => {
            cssStyle += `${key}: ${value};`;
        });
        return cssStyle;
    }

    public hideContainer(layoutContainer: LayoutContainer): boolean {
        return layoutContainer.layoutType === LayoutObjectType.FLEX && this.hideFlexContainer(layoutContainer);
    }

    protected hideFlexContainer(layoutContainer: LayoutContainer): boolean {
        if (!layoutContainer.properties.hasOwnProperty('flex-direction') || layoutContainer.properties['flex-direction'] === 'row') {
            return !layoutContainer.hasData || !layoutContainer.items || layoutContainer.items.length === 0 || layoutContainer.items.every(layoutItem => !layoutItem.field || layoutItem.field.behavior.hidden);
        }
        return false;
    }

    public hideItem(layoutContainer: LayoutContainer, layoutItem: LayoutItem): boolean {
        return layoutItem.layoutType === LayoutObjectType.FLEX ? this.hideFlexItem(layoutContainer, layoutItem) : this.hideGridItem(layoutContainer, layoutItem);
    }

    protected hideFlexItem(layoutContainer: LayoutContainer, layoutItem: LayoutItem): boolean {
        return layoutContainer.properties.hasOwnProperty('flex-direction') && layoutContainer.properties['flex-direction'] === 'column'
            && ((layoutItem.field && layoutItem.field.behavior.hidden) || (!layoutItem.field && !layoutItem.container));

    }

    protected hideGridItem(layoutContainer: LayoutContainer, layoutItem: LayoutItem): boolean {
        return !layoutItem.field || layoutItem.field.behavior.hidden;
    }
}
