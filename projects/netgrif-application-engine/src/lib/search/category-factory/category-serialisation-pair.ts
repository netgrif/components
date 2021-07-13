import {Type} from '@angular/core';
import {Category} from '../models/category/category';
import {Categories} from '../models/category/categories';

/**
 * Represents a pairing of a {@link Category} class and its serialised form
 */
export interface CategorySerialisationPair {
    classReference: Type<Category<any>>;
    serialized: Categories | string;
}
