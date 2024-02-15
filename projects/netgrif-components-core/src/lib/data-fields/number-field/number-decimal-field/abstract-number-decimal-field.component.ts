import {AfterViewInit, Component, Inject, Optional} from "@angular/core";
import {AbstractNumberErrorsComponent} from "../abstract-number-errors.component";
import {DecimalPipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {NumberField} from "../models/number-field";

@Component({
    selector: 'ncc-abstract-number-decimal-field',
    template: ''
})
export abstract class AbstractNumberDecimalFieldComponent extends AbstractNumberErrorsComponent implements AfterViewInit {

    transformedValue: string;
    fieldType: string;
    public readonly NUMBER_TYPE = 'number';
    public readonly TEXT_TYPE = 'text';
    public readonly WHITESPACE = ' ';

    protected constructor(protected _decimalPipe: DecimalPipe,
                          _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>) {
        super(_translate, dataFieldPortalData);
    }

    ngAfterViewInit() {
        this.fieldType = this.TEXT_TYPE;
        this.transformedValue = this.transformDecimal(this.dataField.value?.toString());
        this.dataField.valueChanges().subscribe(value => {
            if (value !== undefined && value !== null) {
                if (this.fieldType === this.TEXT_TYPE) {
                    this.transformedValue = this.transformDecimal(value.toString());
                }
            } else {
                this.transformedValue = '';
            }
        });
    }

    transformToText(event: Event) {
        const target = (event.target as HTMLInputElement);
        this.fieldType = this.TEXT_TYPE;
        this.transformedValue = this.transformDecimal(target.value);
    }

    transformToNumber() {
        this.fieldType = this.NUMBER_TYPE;
        this.transformedValue = !!this.dataField.value ? this.dataField.value.toString() : '0';
    }

    isNumberType(): boolean {
        return this.fieldType === this.NUMBER_TYPE;
    }

    private transformDecimal(value: string | undefined): string {
        value = !!value ? value : '0';
        if (!!this.dataField.component) {
            return this._decimalPipe.transform(
                parseFloat(value),
                this.dataField.component.properties['digitsInfo'],
                this.dataField.component.properties['locale']);
        }
        return value;
    }
}
