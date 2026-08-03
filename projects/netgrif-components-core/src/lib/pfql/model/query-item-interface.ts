import {QueryItemType} from "./query-item-type";

// todo 2466 doc
export interface QueryItemInterface {
    type(): QueryItemType;
    isNegatable(): boolean;
}
