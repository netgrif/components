import {ConfigurationInput} from "../configuration-input";
import {Query} from "../query/query";
import {Category} from "./category";
import {Observable, of} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {FilterTextSegment} from "../persistance/filter-text-segment";
import {OperatorService} from "../../operator-service/operator.service";
import {LoggerService} from "../../../logger/services/logger.service";
import {SearchInputType} from "./search-input-type";
import {ResourceTypeQueryPrefix} from "./resource-type-query-prefix";
import {RawExpression} from "../../../pfql/model/raw-expression";

export abstract class PlainQueryCategory extends Category<string> {
    private static readonly _title = 'search.category.plainText'; // todo 2466 add translation

    protected _configurationInput: ConfigurationInput;

    protected constructor(operators: OperatorService, logger: LoggerService, resourceType: ResourceTypeQueryPrefix) {
        super([], [], `${PlainQueryCategory._title}.name`, SearchInputType.PLAIN_QUERY, logger, operators, resourceType);
        this._configurationInput = new ConfigurationInput(
            SearchInputType.PLAIN_QUERY,
            'search.category.plainText.name',
            false,
            new Map<string, Array<unknown>>(),
            () => {
                throw new Error('ConfigurationInput of type PLAIN_QUERY is a placeholder!'
                    + ' Use operator related methods from the Category class instead.');
            }
        );
        const fc = this._configurationInput.formControl;
        fc.valueChanges.pipe(debounceTime(600)).subscribe(() => this.operandValueChanges(0));
        this._operandsFormControls.push(fc);
    }

    protected override generateQuery(userInput: string[]): Query {
        if (!userInput || userInput.length === 0) {
            return new Query('', this._resourceTypePrefix);
        }
        const pfqlQueryString: string = userInput[0];
        return new Query(pfqlQueryString).ensurePrefixAndGet(this._resourceTypePrefix);
    }

    protected override operandValueChanges(operandIndex: number) {
        this._generatedPredicate$.next(this.generatePredicate(this._operandsFormControls
            .filter(fc => !!fc)
            .map(fc => this.transformCategoryValue(fc.value))))
        return;
    }

    public loadFromPfqlRawExpression(expression: RawExpression): Observable<void> {
        this.setOperands([expression.rawQuery]);
        return of(undefined);
    }

    get configurationInputs$(): Observable<ConfigurationInput[]> {
        return of([this._configurationInput]);
    }

    protected createConfigurationFilterTextSegments(): FilterTextSegment[] {
        return [];
    }

    get displayBold(): boolean {
        return true;
    }

    protected isOperandValueSelected(newValue: any): boolean {
        return !!newValue;
    }

    get inputPlaceholder(): string {
        return `${PlainQueryCategory._title}.placeholder`;
    }
}
