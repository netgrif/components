import {NumberField} from './models/number-field';
import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {NumberFieldValidation} from "../../registry/validation/model/validation-enums";
import {ValidationRegistryService} from "../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-number-errors-field',
    template: ''
})
export abstract class AbstractNumberErrorsComponent extends AbstractBaseDataFieldComponent<NumberField>{

    protected constructor(protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

    protected resolveComponentSpecificErrors(field: DataField<any>, formControlRef: FormControl) {
        if (this.formControlRef.hasError(NumberFieldValidation.IN_RANGE)) {
            const validation = field.validations.find(value => value.name === NumberFieldValidation.IN_RANGE);
            return this.resolveErrorMessage(validation,
                NumberFieldValidation.IN_RANGE, this._translate.instant('dataField.validations.inrange', {range: `${validation.clientArguments[0]},${validation.clientArguments[1]}`})
            );
        }
        return undefined;
    }
}
