import {Component, HostListener, Inject, Input, OnDestroy, Optional} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../data-field-template/models/wrapped-boolean";
import {NAE_SAVE_DATA_INFORM} from "../models/save-data-inform-token";

@Component({
    selector: 'ncc-base-data-field',
    template: ''
})
export abstract class AbstractBaseDataFieldComponent<T extends DataField<unknown>> implements OnDestroy {

    @Input() public dataField: T;
    @Input() public formControlRef: FormControl;
    @Input() public showLargeLayout: WrappedBoolean;
    public _saveDataInform: boolean;

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        if (!!dataFieldPortalData) {
            this.dataField = dataFieldPortalData.dataField;
            this.formControlRef = dataFieldPortalData.formControlRef;
            this.showLargeLayout = dataFieldPortalData.showLargeLayout;
            if (!this.dataField.initialized) {
                this.formControlRef = new FormControl('', {updateOn: this.dataField.getUpdateOnStrategy()});
                this.dataField.registerFormControl(this.formControlRef)
            }
        }
        this._saveDataInform = _saveDataInform;
    }

    ngOnDestroy(): void {
        this.dataField.disconnectFormControl();
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadEventHandler(event) {
        if (this._saveDataInform && this.dataField.isFocused()) {
            this.dataField.unsetFocus();
            (document.activeElement as HTMLElement).blur();
            return false;
        }
        return true;
    }

    public checkPropertyInComponent(property: string): boolean {
        return !!this.dataField?.component?.properties
            && property in this.dataField.component.properties;
    }

    public hasTitle(): boolean {
        return this.dataField.title !== undefined && this.dataField.title !== '';
    }

    public hasHint(): boolean {
        return this.dataField.description !== undefined && this.dataField.description !== '';
    }
}
