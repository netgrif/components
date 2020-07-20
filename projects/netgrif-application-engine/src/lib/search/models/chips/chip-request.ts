import {Query} from '../query/query';

/**
 * Holds information that is necessary for adding a search chip into the search interface from another component/service.
 */
export interface ChipRequest {
    /**
     * The text that should be displayed by the chip
     */
    chipText: string;
    /**
     * The {@link Query} that should be held within the chip
     */
    chipQuery: Query;
}
