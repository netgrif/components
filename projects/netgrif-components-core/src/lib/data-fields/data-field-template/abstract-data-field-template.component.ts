import {Component, ElementRef, Injector, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {WrappedBoolean} from './models/wrapped-boolean';
import {DataField} from '../models/abstract-data-field';
import {TemplateAppearance} from '../models/template-appearance';
import {ConfigurationService} from '../../configuration/configuration.service';
import {FormControl} from "@angular/forms";
import {ComponentPortal} from "@angular/cdk/portal";
import {ComponentRegistryService} from "../../registry/component-registry.service";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";

/**
 * Provides a responsive layout to data fields where their appearance can change based on the width of space they have available.
 *
 * If the width of the available space is less than the `layoutChangeWidthBreakpoint` then the provided `dataFieldTemplate` is displayed at
 * 100% width. If the width is greater or equal to the breakpoint the datafield template occupies the right half and the left half contains
 * it's title.
 *
 * If the datafield's layout is set to `TemplateAppearance.MATERIAL` the field always occupies 100% of the available space
 * regardless of it's width.
 *
 * See {@link DataField} and {@link TemplateAppearance} for more information.
 */

@Component({
    selector: 'ncc-abstract-datafield-template',
    template: ''
})
export abstract class AbstractDataFieldTemplateComponent implements OnInit {

    /**
     * Content of the datafield that should be displayed in the template
     */
    @Input() public dataFieldTemplate: TemplateRef<any>;
    /**
     * If the available space has a width smaller that this breakpoint the datafield will fill 100% of the available space.
     *
     * The breakpoint is only taken into consideration if `TemplateAppearance.NETGRIF` is set on the data field.
     *
     * See [DataField.layout]{@link DataField#layout} for more information.
     */
    @Input() public layoutChangeWidthBreakpoint = 250;
    /**
     * Field offset defined by task
     */
    @Input() public offset = 0;

    @Input() private _additionalFieldProperties: { [ k: string ]: string | number };

    @ViewChild('dataFieldContainer') container: ElementRef;
    protected _dataField: DataField<any>;
    protected _isConfiguredNetgrifTemplate = true;
    protected _isNetgrifTemplate = true;
    protected _componentPortal: ComponentPortal<any>;

    /**
     * @ignore
     * The value determines whether the layout should be "small" or not. Data field fills 100% of the width in "small" layout.
     */
    protected _showLargeLayout: WrappedBoolean = new WrappedBoolean();

    protected constructor(protected _config: ConfigurationService,
                          protected _componentRegistry: ComponentRegistryService,
                          protected injector: Injector) {
        const configuredTemplate = this._config.getDatafieldConfiguration();
        this._isConfiguredNetgrifTemplate = configuredTemplate
            && configuredTemplate.template
            && configuredTemplate.template === TemplateAppearance.NETGRIF;
    }

    public ngOnInit() {
        if (!!this._dataField && !!this._dataField.layout && !!this._dataField.layout.offset) {
            this.offset += this._dataField.layout.offset;
        }
        this._showLargeLayout.value = this.evaluateTemplate();
        this._dataField.resolveAppearance(this._config);
    }

    get showLargeLayout(): WrappedBoolean {
        return this._showLargeLayout;
    }

    /**
     * Datafield model object that should be displayed in the template
     */
    @Input() set dataField(dataField: DataField<any>) {
        this._dataField = dataField;
        if (this._dataField.layout && this._dataField.layout.template) {
            this._isNetgrifTemplate = this._dataField.layout.template === TemplateAppearance.NETGRIF;
        } else {
            this._isNetgrifTemplate = this._isConfiguredNetgrifTemplate;
        }
        this._componentPortal = this.resolveComponentPortal(this.dataField, this.showLargeLayout, this.dataField.formControlRef, this.additionalFieldProperties)
    }

    get dataField(): DataField<any> {
        return this._dataField;
    }

    get componentPortal(): ComponentPortal<any> {
        return this._componentPortal;
    }


    get additionalFieldProperties(): {[k:string]: string | number} {
        return this._additionalFieldProperties;
    }

    @Input()
    set additionalFieldProperties(value: {[k:string]: string | number}) {
        this._additionalFieldProperties = value;
    }

    /**
     * Function that is called when the Component changes dimension and
     * determines whether the "small" or "large" layout should be displayed.
     * @param event - event containing the new width of this Component
     */
    public evaluateTemplateCondition(): boolean {
        (this.container && this.container.nativeElement && this.container.nativeElement.offsetWidth) ?
            this._showLargeLayout.value =
                this.container.nativeElement.offsetWidth  >= this.layoutChangeWidthBreakpoint && this.evaluateTemplate() :
            this._showLargeLayout.value = this.evaluateTemplate();
        return this._showLargeLayout.value;
    }


    public hasComponent(): boolean {
        return this._componentRegistry.contains(this.dataField.getTypedComponentType());
    }

    public resolveComponentPortal(dataField: DataField<any>, showLargeLayout: WrappedBoolean, formControlRef: FormControl, additionalFieldProperties?: {[k:string]: string | number}): ComponentPortal<any> {
        if (this.hasComponent()) {
            const portalInjector = Injector.create({
                providers: [
                    {
                        provide: DATA_FIELD_PORTAL_DATA,
                        useValue: {
                            dataField: dataField,
                            showLargeLayout: showLargeLayout,
                            formControlRef: formControlRef,
                            additionalFieldProperties
                        } as DataFieldPortalData<any>
                    }],
                parent: this.injector
            });
            return this._componentRegistry.get(this.dataField.getTypedComponentType(), portalInjector);
        }
        return undefined;
    }

    /**
     * @returns `false` if the data field uses the `TemplateAppearance.MATERIAL` and `true` otherwise.
     */
    protected evaluateTemplate(): boolean {
        if (!this._dataField) {
            return true;
        }
        return this._isNetgrifTemplate;
    }
}
