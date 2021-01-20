import {SearchInputType} from './category/search-input-type';

/**
 * Represents a search configuration input.
 */
export class ConfigurationInput {
    /**
     * @param type the type of the configuration input
     * @param label the translation path for the label of the input
     */
    constructor(public type: SearchInputType.AUTOCOMPLETE | SearchInputType.OPERATOR, public label: string) {
    }

    // TODO rework search, so that all the configuration input related methods are called from this class
}
