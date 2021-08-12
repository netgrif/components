import {SearchMode} from './search-mode';

export interface SearchComponentConfiguration {
    showSearchIcon?: boolean;
    showSearchToggleButton?: boolean;
    showAdvancedSearchHelp?: boolean;
    showSaveFilterButton?: boolean;
    showLoadFilterButton?: boolean;
    initialSearchMode?: SearchMode;
}
