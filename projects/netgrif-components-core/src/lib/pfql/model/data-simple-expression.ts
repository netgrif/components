import {SimpleExpression} from "./simple-expression";
import {Operator} from "../../search/models/operator/operator";
import {Category} from "../../search/models/category/category";

/**
 * Represents a simple expression that operates on data fields in PFQL queries.
 * Extends SimpleExpression to provide data field-specific functionality.
 *
 * This class extracts and stores the data field identifier from a data field path,
 * allowing for easy access to the field ID when constructing PFQL queries.
 */
export class DataSimpleExpression extends SimpleExpression {
    protected _dataFieldId: string;

    public constructor(dataFieldPath: string, operator: Operator<any>, operandValue: any, category?: Category<any>) {
        super(operator, operandValue, category);

        const parts = dataFieldPath.split('.');
        this._dataFieldId = parts.length >= 3 && parts[0] === 'data' ? parts[1] : dataFieldPath;
    }

    public get dataFieldId(): string {
        return this._dataFieldId;
    }
}
