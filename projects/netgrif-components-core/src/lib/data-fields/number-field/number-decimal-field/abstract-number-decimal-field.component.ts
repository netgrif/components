import {AfterViewInit, Component} from "@angular/core";
import {AbstractNumberErrorsComponent} from "../abstract-number-errors.component";
import {DecimalPipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

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

    protected constructor(protected _decimalPipe: DecimalPipe, translateService: TranslateService) {
        super(translateService);
    }

    ngAfterViewInit() {
        this.fieldType = this.TEXT_TYPE;
        this.transformedValue = this.transformDecimal(this.numberField.value?.toString());
        this.numberField.valueChanges().subscribe(value => {
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
        this.transformedValue = !!this.numberField.value ? this.numberField.value.toString() : '0';
    }

    isNumberType(): boolean {
        return this.fieldType === this.NUMBER_TYPE;
    }

    private transformDecimal(value: string | undefined): string {
        value = !!value ? value : '0';
        return this._decimalPipe.transform(
            parseFloat(value),
            this.numberField.component.properties['digitInfo'],
            this.numberField.component.properties['locale']);
    }
}
