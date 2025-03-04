import {Component, Inject, Input, OnDestroy, Optional} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../data-field-template/models/wrapped-boolean";
import {TranslateService} from "@ngx-translate/core";
import {Validation} from "../models/validation";
import {ValidationRegistryService} from "../../registry/validation/validation-registry.service";
import {FieldValidation} from "../../registry/validation/model/validation-enums";

@Component({
    selector: 'ncc-base-data-field',
    template: ''
})
export abstract class AbstractBaseDataFieldComponent<T extends DataField<unknown>> implements OnDestroy {

    @Input() public dataField: T;
    @Input() public formControlRef: FormControl;
    @Input() public showLargeLayout: WrappedBoolean;
    protected readonly GENERIC_MESSAGE = 'dataField.validations.invalid';

    constructor(protected _translate: TranslateService,
                protected _validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>) {
        if (!!dataFieldPortalData) {
            this.dataField = dataFieldPortalData.dataField;
            this.formControlRef = dataFieldPortalData.formControlRef;
            this.showLargeLayout = dataFieldPortalData.showLargeLayout;
            if (!this.dataField.initialized) {
                this.formControlRef = new FormControl('', {updateOn: this.dataField.getUpdateOnStrategy()});
                this.dataField.registerFormControl(this.formControlRef)
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

    public hasTitle(): boolean {
        return this.dataField.title !== undefined && this.dataField.title !== '';
    }

    public hasHint(): boolean {
        return this.dataField.description !== undefined && this.dataField.description !== '';
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.dataField, this.formControlRef);
    }

    protected buildErrorMessage(field: DataField<any>, formControlRef: FormControl) {
        if (formControlRef.hasError(FieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }

        const specific = this.resolveComponentSpecificErrors(field, formControlRef);
        if (specific !== undefined) {
            return specific;
        }

        for (const valid of field.validations) {
            if (formControlRef.hasError(valid.name)) {
                return this.resolveErrorMessage(valid, valid.name);
            }
        }

        return '';
    }

    protected resolveErrorMessage(validation: Validation, search: string, genericMessage?: string) {
        if (validation.message && validation.message !== '') {
            return validation.message;
        }
        if (this._validationRegistry.containsTranslation(search)) {
            return this._translate.instant(this._validationRegistry.getTranslation(search));
        }
        if (genericMessage) {
            return genericMessage;
        }
        return this._translate.instant(this.GENERIC_MESSAGE);
    }

    protected resolveComponentSpecificErrors(field: DataField<any>, formControlRef: FormControl) {
        return undefined;
    }
}
