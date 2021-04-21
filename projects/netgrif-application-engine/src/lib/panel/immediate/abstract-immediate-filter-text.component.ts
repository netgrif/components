import {Injector, Input, OnInit, StaticProvider} from '@angular/core';
import {FilterMetadataAllowedNets} from '../../search/models/persistance/filter-metadata-allowed-nets';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {AbstractImmediateFilterTextContentComponent} from './abstract-immediate-filter-text-content.component';
import {NAE_FILTER_TEXT} from './model/filter-text-injection-token';

export abstract class AbstractImmediateFilterTextComponent implements OnInit {

    @Input() public ellipsis: boolean;
    @Input() public filterMetadata: FilterMetadataAllowedNets;
    public portal: ComponentPortal<AbstractImmediateFilterTextContentComponent>;
    public initialized: boolean;

    protected constructor(protected _parenInjector: Injector) {
    }

    ngOnInit(): void {
        const providers: Array<StaticProvider> = [
            {provide: NAE_FILTER_TEXT, useValue: {metadata: this.filterMetadata, ellipsis: this.ellipsis}}
        ];
        const injector = Injector.create({providers, parent: this._parenInjector});
        this.portal = new ComponentPortal(this.getFilterTextContentComponent(), null, injector);
        this.initialized = true;
    }

    protected abstract getFilterTextContentComponent(): ComponentType<AbstractImmediateFilterTextContentComponent>;

}
