import {AutocompleteOptions} from './autocomplete-options';
import {Observable, of} from 'rxjs';
import {SearchAutocompleteOption} from './search-autocomplete-option';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {hasContent} from '../../../utility/pagination/page-has-content';
import {OptionalDependencies} from '../../category-factory/optional-dependencies';

/**
 * Contains implementation of querying the backend for user information.
 *
 * Should be used by all search categories that want to search by users to ensure the necessary code is kept in one place.
 */
export class UserAutocomplete implements AutocompleteOptions {

    public static readonly USER_ICON = 'account_circle';

    public static readonly USER_ME_ICON = 'person'; // person_pin, person_pin_circle

    public static readonly USER_ME_TEMPLATE = '<<me>>';


    protected _userResourceService: UserResourceService;

    /**
     * @param optionalDependencies search OptionalDependencies
     * @param _includeMe whether the pseudo-user "ME" should be included in the search results
     */
    constructor(optionalDependencies: OptionalDependencies, protected _includeMe = true) {
        this._userResourceService = optionalDependencies.userResourceService;
    }

    filterOptions(userInput: Observable<string | SearchAutocompleteOption<Array<string>>>)
        : Observable<Array<SearchAutocompleteOption<Array<string>>>> {

        return userInput.pipe(
            startWith(''),
            debounceTime(600),
            switchMap(input => {
                if (typeof input === 'string') {
                    return this._userResourceService.search({fulltext: input}).pipe(
                        map(page => {
                            if (hasContent(page)) {
                                const options = page.content.map(
                                    user => ({text: user.fullName, value: [user.id], icon: UserAutocomplete.USER_ICON})
                                );

                                if (this._includeMe) {
                                    options.unshift(
                                        {text: '', value: [UserAutocomplete.USER_ME_TEMPLATE], icon: UserAutocomplete.USER_ME_ICON}
                                    );
                                }

                                return options;
                            }
                            return [];
                        })
                    );
                } else {
                    return of([input]);
                }
            })
        );
    }
}
