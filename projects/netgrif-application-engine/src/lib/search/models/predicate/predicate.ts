import {Query} from '../query/query';
import {GeneratorMetadata} from '../persistance/generator-metadata';
import {FilterTextSegment} from '../persistance/filter-text-segment';
import {BooleanOperator} from '../boolean-operator';

/**
 * Building block of search queries. Represents any node in a tree of predicates, that are combined with {@link BooleanOperator}s to create
 * a search query.
 *
 * See {@link SearchService} for more information.
 */
export abstract class Predicate {

    protected _visible: boolean;
    protected _metadataGenerator: () => GeneratorMetadata | undefined;
    protected _filterTextSegmentsGenerator: () => Array<FilterTextSegment>;

    /**
     * @param initiallyVisible whether the predicate should be initially displayed or not
     */
    protected constructor(initiallyVisible = true) {
        this._visible = !!initiallyVisible;
        this._metadataGenerator = () => {
            throw new Error('This predicate has no metadata generator registered!');
        };
        this._filterTextSegmentsGenerator = () => {
            return [];
        };
    }

    /**
     * @returns whether the Predicate should be displayed, or not
     */
    public get isVisible(): boolean {
        return this._visible;
    }

    /**
     * @returns the {@link Query} object that corresponds to the `Query` for the entire subtree of Predicates, with
     * this Predicate as it's root node.
     */
    public abstract get query(): Query;

    /**
     * Combines the text segments of the predicates with the given operator and wraps the individual predicates in brackets optionaly
     * @param predicates sources of text segments that are to be combined with a boolean operator
     * @param operator boolean operator used to combine the individual predicate text segments
     * @param wrapWithBrackets whether the individual predicate text segments should be wrapped in braces or not
     * (if only one predicate is provided it is never wrapped)
     */
    public static combineTextSegmentsWithBooleanOperator(predicates: IterableIterator<Predicate> | Array<Predicate>,
                                                         operator: BooleanOperator,
                                                         wrapWithBrackets = false): Array<FilterTextSegment> {
        const result: Array<FilterTextSegment> = [];
        let first = true;
        let hasTwo = false;
        for (const predicate of predicates) {
            const textSegments = predicate.createFilterTextSegments();
            if (textSegments.length > 0) {
                if (!first) {
                    if (!hasTwo && wrapWithBrackets) {
                        result.unshift({segment: '('});
                        hasTwo = true;
                    }
                    if (wrapWithBrackets) {
                        result.push({segment: ')'});
                    }
                    result.push({segment: operator === BooleanOperator.AND ? 'search.and' : 'search.or', uppercase: true});
                    if (wrapWithBrackets) {
                        result.push({segment: '('});
                    }
                }
                result.push(...textSegments);
                first = false;
            }
        }
        if (hasTwo && wrapWithBrackets) {
            result.push({segment: ')'});
        }
        return result;
    }

    /**
     * Sets the predicates state to `visible`
     */
    public show(): void {
        this._visible = true;
    }

    public setMetadataGenerator(metadataGenerator: () => GeneratorMetadata | undefined) {
        this._metadataGenerator = metadataGenerator;
    }

    /**
     * @returns an object containing the necessary information for the reconstruction of the entire predicate tree in serializable form.
     * Returns `undefined` if the predicate tree rooted at this node is incomplete and would evaluate into an empty filter.
     */
    public createGeneratorMetadata(): GeneratorMetadata | undefined {
        return this._metadataGenerator();
    }

    public setFilterTextSegmentsGenerator(filterTextSegmentsGenerator: () => Array<FilterTextSegment>) {
        this._filterTextSegmentsGenerator = filterTextSegmentsGenerator;
    }

    /**
     * @returns an Array containing text segments representing the content of this predicate.
     * The default implementation returns an empty array.
     */
    public createFilterTextSegments(): Array<FilterTextSegment> {
        return this._filterTextSegmentsGenerator();
    }
}
