import {Component, Inject, Input, OnDestroy, Optional} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../data-field-template/models/wrapped-boolean";
import {ValidationRegistryService} from "../../registry/validation-registry.service";
import {TranslateService} from "@ngx-translate/core";
import {FieldConverterService} from "../../task-content/services/field-converter.service";

@Component({
    selector: 'ncc-base-data-field',
    template: ''
})
export abstract class AbstractBaseDataFieldComponent<T extends DataField<unknown>> implements OnDestroy {

    @Input() public dataField: T;
    @Input() public formControlRef: FormControl;
    @Input() public showLargeLayout: WrappedBoolean;

    constructor(private _translate?: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData?: DataFieldPortalData<T>,
                private _validationRegistry?: ValidationRegistryService) {
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

    get validationRegistry(): ValidationRegistryService {
        return this._validationRegistry;
    }

    get translate(): TranslateService {
        return this._translate;
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
        if (!!this.validationRegistry) {
            const validators = this.validationRegistry.registry.get(FieldConverterService.resolveType(this.dataField));
            for (const validator of validators.values()) {
                if (this.formControlRef.hasError(validator.validationErrorKey)) {
                    const validation = this.dataField.validations.find(v => v.name === validator.key);
                    const args = [];
                    const messageParams = {};
                    validator.attributeNames.forEach(atr => {
                        const attributeValue = validation.arguments[atr].value;
                        messageParams[atr] = attributeValue;
                        args.push(attributeValue)
                    })
                    return this.resolveErrorMessage(validator.key, this.translate.instant(validator.defaultErrorMessage(...args), messageParams));
                }
            }
        }
        return '';
    }

    private resolveErrorMessage(search: string, generalMessage: string) {
        if (!!this.dataField.validations) {
            const validation = this.dataField.validations.find(value => value.name === search);
            if (validation.validationMessage && validation.validationMessage !== '') {
                return validation.validationMessage;
            }
        }
        return generalMessage;
    }
}
