import {AutocompleteOptions} from './autocomplete-options';
import {Observable, of} from 'rxjs';
import {SearchAutocompleteOption} from './search-autocomplete-option';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {hasContent} from '../../../utility/pagination/page-has-content';
import {OptionalDependencies} from '../../category-factory/optional-dependencies';
import {FormControl} from '@angular/forms';

/**
 * Contains implementation of querying the backend for user information.
 *
 * Should be used by all search categories that want to search by users to ensure the necessary code is kept in one place.
 */
export class UserAutocomplete implements AutocompleteOptions {

    public static readonly USER_ICON = 'account_circle';

    public static readonly USER_ME_ICON = 'person_pin_circle'; // person_pin, person_pin_circle

    public static readonly USER_ME_TEMPLATE = '<<me>>';

    private static readonly _i18n = 'search.category.userMe';


    protected _userResourceService: UserResourceService;

    /**
     * @param optionalDependencies search OptionalDependencies
     * @param _includeMe whether the pseudo-user "ME" should be included in the search results
     */
    constructor(optionalDependencies: OptionalDependencies, protected _includeMe = true) {
        this._userResourceService = optionalDependencies.userResourceService;
    }

    filterOptions(userInput: Observable<string | SearchAutocompleteOption<Array<string>>>):
        Observable<Array<SearchAutocompleteOption<Array<string>>>> {

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
                                    options.unshift({
                                        text: UserAutocomplete._i18n,
                                        value: [UserAutocomplete.USER_ME_TEMPLATE],
                                        icon: UserAutocomplete.USER_ME_ICON
                                    });
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

    public serializeOperandValue(valueFormControl: FormControl): any {
        const autocompleteValue = valueFormControl.value as SearchAutocompleteOption<Array<string>>;
        return {text: autocompleteValue.text, value: autocompleteValue.value};
    }

    public deserializeOperandValue(savedOption: SearchAutocompleteOption<Array<string>>):
        Observable<SearchAutocompleteOption<Array<string>>> {
        return of({...savedOption, icon: this.isUserMeTemplate(savedOption) ? UserAutocomplete.USER_ME_ICON : UserAutocomplete.USER_ICON});
    }

    private isUserMeTemplate(option: SearchAutocompleteOption<Array<string>>): boolean {
        return !!option?.value
            && Array.isArray(option.value)
            && option.value.length === 1
            && option.value[0] === UserAutocomplete.USER_ME_TEMPLATE;
    }
}
