import {InjectionToken, Type} from '@angular/core';
import {Category} from '../models/category/category';

/**
 * Contains the search categories that can be used with the [SearchComponent]{@link AbstractSearchComponent} that injects them.
 *
 * The search component is universal and the categories provided with this token are what determines what query objects
 * are going to be constructed.
 *
 * The token content with the type `Array<Category<any>>` has been deprecated in 5.6.0 in favor of the new type `Array<Type<Category<any>>>`
 * but remains for backwards-compatibility.
 */
export const NAE_SEARCH_CATEGORIES = new InjectionToken<Array<Category<any>> | Array<Type<Category<any>>>>('NaeSearchCategories');

/**
 * Contains a list of classes that represent the default case search categories.
 *
 * The default search categories can be overridden by providing this injection token with a new set of categories in the `AppComponent`.
 */
export const NAE_DEFAULT_CASE_SEARCH_CATEGORIES = new InjectionToken<Array<Type<Category<any>>>>('NaeDefaultCaseSearchCategories');

/**
 * Contains a list of classes that represent the default task search categories.
 *
 * The default search categories can be overridden by providing this injection token with a new set of categories in the `AppComponent`.
 */
export const NAE_DEFAULT_TASK_SEARCH_CATEGORIES = new InjectionToken<Array<Type<Category<any>>>>('NaeDefaultTaskSearchCategories');
