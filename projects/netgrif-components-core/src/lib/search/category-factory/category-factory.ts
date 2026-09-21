import {Inject, Injectable, Optional, Type} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {OperatorService} from '../operator-service/operator.service';
import {Category} from '../models/category/category';
import {OptionalDependencies} from './optional-dependencies';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {SearchIndexResolverService} from '../search-keyword-resolver-service/search-index-resolver.service';
import {CategoryResolverService} from './category-resolver.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY} from "./search-categories-injection-token";

/**
 * Can be used to generate {@link Category} class instances.
 *
 * Can only generate instances of Categories that take {@link OperatorService} as their first argument, {@link LoggerService} as their
 * second argument and {@link OptionalDependencies} object is passed as the third. `null` is passed as the third argument otherwise.
 * You can extend this class to support your Categories, but make sure that an injection token for this classes name
 * is still provided for the library components that use it.
 */
@Injectable()
export class CategoryFactory {

    protected _optionalDependencies: OptionalDependencies;

    constructor(protected _operators: OperatorService,
                protected _log: LoggerService,
                protected _searchIndexResolverService: SearchIndexResolverService,
                protected _categoryResolver: CategoryResolverService,
                protected _allowedNetsService: AllowedNetsService,
                @Optional() protected _userResourceService: UserResourceService,
                @Optional() @Inject(NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY) protected _ignoreNetsOnAutocompleteCategories: boolean) {
        this._optionalDependencies = {
            categoryFactory: this,
            searchIndexResolver: this._searchIndexResolverService,
            allowedNetsService: this._allowedNetsService,
            userResourceService: this._userResourceService,
            ignoreNetsOnAutocompleteCategories: this._ignoreNetsOnAutocompleteCategories,
        };
    }

    /**
     * Create an instance of {@link Category} class.
     * @param categoryClass the class that should be instantiated
     * @returns a new instance of the provided class
     */
    public get(categoryClass: Type<Category<any>>): Category<any> {
        return new categoryClass(this._operators, this._log, this._optionalDependencies);
    }

    /**
     * Create an instance of {@link Category} class and preselects it's default operator.
     * @param categoryClass the class that should be instantiated
     * @returns a new instance of the provided class with the default operator selected
     */
    public getWithDefaultOperator(categoryClass: Type<Category<any>>): Category<any> {
        const category = this.get(categoryClass);
        category.selectDefaultOperator();
        return category;
    }

    /**
     * Attempts to deserialize the provided `string` into a {@link Category} class,
     * create an instance from it and preselect it's default operator.
     * @param serializedCategoryClass the serialized form of a {@Link Category} class
     * @returns a new instance of the provided class with the default operator selected
     */
    public getByNameWithDefaultOperator(serializedCategoryClass: string): Category<any> {
        return this.getWithDefaultOperator(this._categoryResolver.toClass(serializedCategoryClass));
    }
}
