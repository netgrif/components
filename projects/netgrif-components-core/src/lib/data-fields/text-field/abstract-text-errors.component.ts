import {FormControl} from '@angular/forms';
import {TextField} from './models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, Optional} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DataField} from "../models/abstract-data-field";
import {TextFieldValidation} from "../../registry/validation/model/validation-enums";
import {ValidationRegistryService} from "../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-text-errors',
    template: ''
})
export abstract class AbstractTextErrorsComponent<T extends TextField> extends AbstractBaseDataFieldComponent<T>{

    protected constructor(protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

    protected resolveComponentSpecificErrors(field: DataField<any>, formControlRef: FormControl) {
        if (formControlRef.hasError(TextFieldValidation.MIN_LENGTH)) {
            const validation = field.validations.find(value => value.name === TextFieldValidation.MIN_LENGTH);
            return this.resolveErrorMessage(validation, TextFieldValidation.MIN_LENGTH,
                this._translate.instant('dataField.validations.minLength', {length: formControlRef.errors.minLength.requiredLength}));
        }
        if (formControlRef.hasError(TextFieldValidation.MAX_LENGTH)) {
            const validation = field.validations.find(value => value.name === TextFieldValidation.MAX_LENGTH);
            return this.resolveErrorMessage(validation, TextFieldValidation.MAX_LENGTH,
                this._translate.instant('dataField.validations.maxLength', {length: formControlRef.errors.maxLength.requiredLength}));
        }
        return undefined;
    }
}
