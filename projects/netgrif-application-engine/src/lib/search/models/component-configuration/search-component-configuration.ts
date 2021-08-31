import {SearchMode} from './search-mode';

export interface SearchComponentConfiguration {
    showSearchIcon?: boolean;
    showSearchToggleButton?: boolean;
    showAdvancedSearchHelp?: boolean;
    showSaveFilterButton?: boolean;
    showLoadFilterButton?: boolean;
    initialSearchMode?: SearchMode;
    /**
     * Whether the saved filter should be saved with the [defaultSearchCategories]{@link FilterMetadata#defaultSearchCategories}
     * flag set to `true`, or `false`.
     * If no configuration is provided the flag will be set to `true` by default.
     */
    saveFilterWithDefaultCategories?: boolean;
    /**
     * Whether the saved filter should be saved with the [inheritAllowedNets]{@link FilterMetadata#inheritAllowedNets} flag set to
     * `true`, or `false`.
     * If no configuration is provided the flag will be set to `true` by default.
     */
    inheritAllowedNets?: boolean;
}
