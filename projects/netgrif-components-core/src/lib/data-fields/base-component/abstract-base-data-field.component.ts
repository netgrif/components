import {Component, Inject, Input, OnDestroy, Optional} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../data-field-template/models/wrapped-boolean";

@Component({
    selector: 'ncc-base-data-field',
    template: ''
})
export abstract class AbstractBaseDataFieldComponent<T extends DataField<unknown>> implements OnDestroy {

    private static readonly TRUE_VALUES = ['true', '1', 'yes', 'y', 'ano', 'áno', 'pravda'];
    private static readonly FALSE_VALUES = ['false', '0', 'no', 'n', 'nie', 'nepravda'];

    @Input() public dataField: T;
    @Input() public formControlRef: FormControl;
    @Input() public showLargeLayout: WrappedBoolean;

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>) {
        if (!!dataFieldPortalData) {
            this.dataField = dataFieldPortalData.dataField;
            this.formControlRef = dataFieldPortalData.formControlRef;
            this.showLargeLayout = dataFieldPortalData.showLargeLayout;
            if (!this.dataField.initialized) {
                this.formControlRef = new FormControl('', {updateOn: this.dataField.getUpdateOnStrategy()});
                this.dataField.registerFormControl(this.formControlRef);
            }
        }
    }

    ngOnDestroy(): void {
        this.dataField.disconnectFormControl();
    }

    public checkPropertyInComponent(property: string): boolean {
        return !!this.dataField?.component?.properties
            && property in this.dataField.component.properties;
    }

    public getBooleanComponentProperty(property: string, defaultValue = false): boolean {
        return AbstractBaseDataFieldComponent.resolveBooleanProperty(
            this.dataField?.component?.properties?.[property],
            defaultValue
        );
    }

    public getNumberComponentProperty(property: string, defaultValue: number): number {
        return AbstractBaseDataFieldComponent.resolveNumberProperty(
            this.dataField?.component?.properties?.[property],
            defaultValue
        );
    }

    public static resolveBooleanProperty(value: unknown, defaultValue = false): boolean {
        if (value === undefined || value === null || value === '') {
            return defaultValue;
        }

        if (typeof value === 'boolean') {
            return value;
        }

        if (typeof value === 'string') {
            const normalized = value.trim().toLowerCase();
            if (AbstractBaseDataFieldComponent.TRUE_VALUES.includes(normalized)) {
                return true;
            }
            if (AbstractBaseDataFieldComponent.FALSE_VALUES.includes(normalized)) {
                return false;
            }
            return defaultValue;
        }
        return Boolean(value);
    }

    public static resolveNumberProperty(value: unknown, defaultValue: number): number {
        if (value === undefined || value === null || value === '') {
            return defaultValue;
        }

        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : defaultValue;
    }

    public hasTitle(): boolean {
        return this.dataField.title !== undefined && this.dataField.title !== '';
    }

    public hasHint(): boolean {
        return this.dataField.description !== undefined && this.dataField.description !== '';
    }
}
