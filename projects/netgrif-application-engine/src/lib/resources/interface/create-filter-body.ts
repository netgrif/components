import {FilterType} from '../../filter/models/filter-type';
import {MergeOperator} from '../../filter/models/merge-operator';
import {CaseSearchRequestBody} from '../../filter/models/case-search-request-body';
import {TaskSearchRequestBody} from '../../filter/models/task-search-request-body';
import {GeneratorMetadata} from '../../search/models/category/generator-metadata';

export interface CreateFilterBody {
    /**
     * Filter title
     */
    title: string;
    /**
     * Filter description
     */
    description?: string;
    /**
     * Filter type.
     *
     * The corresponding `filterBodies` property must be defined. The other can be omitted and will be ignored by backend if defined.
     *
     * For case filters - [caseFilterBodies]{@link CreateFilterBody#caseFilterBodies}
     *
     * For task filters - [taskFilterBodies]{@link CreateFilterBody#taskFilterBodies}
     */
    type: FilterType;
    /**
     * Filter merge operator.
     *
     * In general AND should be used as often as possible.
     */
    mergeOperator: MergeOperator;
    /**
     * Filter bodies of case filter.
     *
     * The filters are combined with the specified [mergeOperator]{@link CreateFilterBody#mergeOperator}.
     */
    caseFilterBodies?: Array<CaseSearchRequestBody> | CaseSearchRequestBody;
    /**
     * Filter bodies of task filter.
     *
     * The filters are combined with the specified [mergeOperator]{@link CreateFilterBody#mergeOperator}.
     */
    taskFilterBodies?: Array<TaskSearchRequestBody> | TaskSearchRequestBody;
    /**
     * Data required for the reconstruction of the advanced search GUI.
     */
    searchMetadata: SearchMetadata;
}

/**
 * Data required for the reconstruction of the advanced search GUI.
 */
export interface SearchMetadata {
    /**
     * Identifiers of the Petri Nets that are used to populate the autocomplete search categories.
     */
    allowedNets: Array<string>;
    /**
     * Data required for the reconstruction of the advanced search GUI predicates.
     * The data is used to create {@link Category} instances, that are then used by the {@link SearchService}
     * as generators populating the search service with predicates and in turn populating the search GUI.
     */
    generatorMetadata: GeneratorMetadata;
}
