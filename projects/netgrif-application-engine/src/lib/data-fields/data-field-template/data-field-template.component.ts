import {Component, Input, TemplateRef} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event';
import {WrappedBoolean} from './models/wrapped-boolean';
import {DataField, TemplateAppearance} from '../models/abstract-data-field';

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
    selector: 'nae-data-field-template',
    templateUrl: './data-field-template.component.html',
    styleUrls: ['./data-field-template.component.scss']
})
export class DataFieldTemplateComponent {

    /**
     * Datafield model object that should be displayed in the template
     */
    @Input() public dataField: DataField<any>;
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
     * @ignore
     * The value determines whether the layout should be "small" or not. Data field fills 100% of the width in "small" layout.
     */
    private _showLargeLayout: WrappedBoolean = new WrappedBoolean();

    get showLargeLayout(): WrappedBoolean {
        return this._showLargeLayout;
    }

    /**
     * Function that is called when the Component changes dimension and
     * determines whether the "small" or "large" layout should be displayed.
     * @param event - event containing the new width of this Component
     */
    public evaluateTemplateCondition(event: ResizedEvent): void {
        this._showLargeLayout.value = event.newWidth >= this.layoutChangeWidthBreakpoint && this.evaluateTemplate();
    }

    /**
     * Returns `false` if the data field uses the `TemplateAppearance.MATERIAL` and `true` otherwise.
     */
    private evaluateTemplate(): boolean {
        if (!this.dataField) {
            return true;
        }
        return !!this.dataField.layout ? this.dataField.layout.template === TemplateAppearance.NETGRIF : true;
    }
}
