import {Predicate} from '../predicate/predicate';

/**
 * Holds information that is necessary for adding a search chip into the search interface from another component/service.
 *
 * Either the [chipPredicate]{@link ChipRequest#chipPredicate} or the [predicateIndex]{@link ChipRequest#predicateIndex} property must be
 * defined. If both are defined the value of `chipPredicate` takes precedence.
 */
export interface ChipRequest {
    /**
     * The text that should be displayed by the chip
     */
    chipText: string;
    /**
     * The {@link Predicate} that should be held within the chip
     */
    chipPredicate?: Predicate;
    /**
     * The index of an existing {@link Predicate} within the {@link SearchService} that should be referenced by the chip
     */
    predicateIndex?: number;
}
