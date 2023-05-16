import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {Component, Inject, Injector, Input, OnInit, Optional, StaticProvider} from '@angular/core';
import {FilterField} from './models/filter-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {AbstractFilterFieldContentComponent} from './abstract-filter-field-content.component';
import {NAE_FILTER_FIELD} from './models/filter-field-injection-token';

@Component({
    selector: 'ncc-abstract-filter-field',
    template: ''
})
export abstract class AbstractFilterFieldComponent extends AbstractDataFieldComponent implements OnInit {

    @Input() dataField: FilterField;

    public initialized: boolean;
    public portal: ComponentPortal<AbstractFilterFieldContentComponent>;

    protected constructor(protected _parentInjector: Injector,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    ngOnInit() {
        super.ngOnInit();

        const providers: Array<StaticProvider> = [
            {provide: NAE_FILTER_FIELD, useValue: this.dataField}
        ];

        const injector = Injector.create({providers, parent: this._parentInjector});

        this.portal = new ComponentPortal(this.getFilterContentComponent(), null, injector);

        this.initialized = true;
    }

    public get editable(): boolean {
        return !!this.dataField.behavior.editable;
    }

    protected abstract getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent>;
}
