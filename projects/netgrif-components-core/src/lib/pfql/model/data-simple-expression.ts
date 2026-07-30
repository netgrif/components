import {SimpleExpression} from "./simple-expression";
import {Operator} from "../../search/models/operator/operator";
import {Category} from "../../search/models/category/category";

// todo 2466
export class DataSimpleExpression extends SimpleExpression {
    protected _dataFieldId: string;

    public constructor(dataFieldPath: string, operator: Operator<any>, operandValue: any, negated: boolean, category?: Category<any>) {
        super(operator, operandValue, negated, category);

        const parts = dataFieldPath.split('.');
        this._dataFieldId = parts.length >= 3 && parts[0] === 'data' ? parts[1] : dataFieldPath;
    }

    public get dataFieldId(): string {
        return this._dataFieldId;
    }
}
