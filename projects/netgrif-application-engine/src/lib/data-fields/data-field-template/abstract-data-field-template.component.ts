import {ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {WrappedBoolean} from './models/wrapped-boolean';
import {DataField} from '../models/abstract-data-field';
import {TemplateAppearance} from '../models/template-appearance';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {ConfigurationService} from '../../configuration/configuration.service';

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
    @ViewChild('dataFieldContainer') container: ElementRef;

    protected _dataField: DataField<any>;
    protected _isConfiguredNetgrifTemplate = true;
    protected _isNetgrifTemplate = true;

    /**
     * @ignore
     * The value determines whether the layout should be "small" or not. Data field fills 100% of the width in "small" layout.
     */
    protected _showLargeLayout: WrappedBoolean = new WrappedBoolean();

    protected constructor(protected _paperView: PaperViewService, protected _config: ConfigurationService) {
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
    }

    get dataField(): DataField<any> {
        return this._dataField;
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

    /**
     * @returns `false` if the data field uses the `TemplateAppearance.MATERIAL` and `true` otherwise.
     */
    protected evaluateTemplate(): boolean {
        if (!this._dataField) {
            return true;
        }
        return this._isNetgrifTemplate;
    }

    public isPaperView() {
        return this._paperView.paperView;
    }
}
