import {Component, Injector, Input, OnInit, StaticProvider} from '@angular/core';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {AbstractImmediateFilterTextContentComponent} from './abstract-immediate-filter-text-content.component';
import {NAE_FILTER_TEXT} from './model/filter-text-injection-token';
import {FilterType} from "../../filter/models/filter-type";

@Component({
    selector: 'ncc-abstract-immediate-filter-text',
    template: ''
})
export abstract class AbstractImmediateFilterTextComponent implements OnInit {

    @Input() public ellipsis: boolean;
    @Input() public query: string;
    @Input() public type: string;
    public portal: ComponentPortal<AbstractImmediateFilterTextContentComponent>;
    public initialized: boolean;

    protected constructor(protected _parenInjector: Injector) {
    }

    ngOnInit(): void {
        let filterType: FilterType;
        if (this.type === 'case') {
            filterType = FilterType.CASE;
        } else if (this.type === 'task') {
            filterType = FilterType.TASK;
        }
        const providers: Array<StaticProvider> = [
            {provide: NAE_FILTER_TEXT, useValue: {
                ellipsis: this.ellipsis,
                query: this.query,
                type: filterType
            }}
        ];
        const injector = Injector.create({providers, parent: this._parenInjector});
        this.portal = new ComponentPortal(this.getFilterTextContentComponent(), null, injector);
        this.initialized = true;
    }

    protected abstract getFilterTextContentComponent(): ComponentType<AbstractImmediateFilterTextContentComponent>;

}
