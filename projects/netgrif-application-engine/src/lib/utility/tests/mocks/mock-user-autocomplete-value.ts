import {SearchAutocompleteOption} from '../../../search/models/category/search-autocomplete-option';
import {UserAutocomplete} from '../../../search/models/category/user-autocomplete';

/**
 * @param userName name of the mock user value
 * @param userId id of the mock user value
 * @param normalUser if not the user is the special ME user option
 */
export function mockUserAutocompleteValue(userName: string, normalUser = true, userId?: string)
    : SearchAutocompleteOption<Array<string>> {
    return {
        text: userName,
        value: [normalUser ? userId : UserAutocomplete.USER_ME_TEMPLATE],
        icon: normalUser ? UserAutocomplete.USER_ICON : UserAutocomplete.USER_ME_ICON
    };
}
