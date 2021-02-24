import {InjectionToken} from '@angular/core';
import {Category} from '../models/category/category';

/**
 * Contains the search categories that can be used with the [SearchComponent]{@link AbstractSearchComponent} that injects them.
 *
 * The search component is universal and the categories provided with this token are what determines what query objects
 * are going to be constructed.
 */
export const NAE_SEARCH_CATEGORIES = new InjectionToken<Array<Category<any>>>('NaeSearchCategories');
