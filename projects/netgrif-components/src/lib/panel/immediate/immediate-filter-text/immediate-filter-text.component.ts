import {ComponentType} from '@angular/cdk/portal';
import {Component, Injector} from '@angular/core';
import {AbstractImmediateFilterTextComponent, AbstractImmediateFilterTextContentComponent} from '@netgrif/components-core';
import {ImmediateFilterTextContentComponent} from '../immediate-filter-text-content/immediate-filter-text-content.component';

@Component({
    selector: 'nc-immediate-filter-text',
    templateUrl: './immediate-filter-text.component.html',
    styleUrls: ['./immediate-filter-text.component.scss']
})
export class ImmediateFilterTextComponent extends AbstractImmediateFilterTextComponent {

    constructor(parentInjector: Injector) {
        super(parentInjector);
    }

    protected getFilterTextContentComponent(): ComponentType<AbstractImmediateFilterTextContentComponent> {
        return ImmediateFilterTextContentComponent;
    }
}
