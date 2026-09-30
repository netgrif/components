import {QueryItemInterface} from "./query-item-interface";
import {QueryItemType} from "./query-item-type";
import {PlainQueryCategory} from "../../search/models/category/plain-query-category";

export class RawExpression implements QueryItemInterface {
    protected _category: PlainQueryCategory;
    protected _rawQuery: string;

    public constructor(category: PlainQueryCategory, rawQuery: string) {
        this._category = category;
        this._rawQuery = rawQuery;
    }

    public type(): QueryItemType {
        return QueryItemType.RAW_EXPRESSION;
    }

    public get category(): PlainQueryCategory {
        return this._category;
    }

    public get rawQuery(): string {
        return this._rawQuery;
    }
}
