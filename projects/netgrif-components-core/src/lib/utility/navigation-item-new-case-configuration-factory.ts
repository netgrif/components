import {DataGroup} from "../resources/interface/data-groups";
import {extractFieldValueFromData} from "../navigation/utility/navigation-item-task-utility-methods";
import {GroupNavigationConstants} from "../navigation/model/group-navigation-constants";
import {I18nFieldValue} from "../data-fields/i18n-field/models/i18n-field-value";

export function navigationItemNewCaseConfigurationFactory(navigationItemTaskData: DataGroup[]) {
    const requiredCaseTitle: boolean = extractFieldValueFromData<boolean>(navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_TITLE_IN_CREATION);
    const blockNetsString: string = extractFieldValueFromData<string>(navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_BANNED_PROCESS_CREATION);
    return {
        enableCaseTitle: requiredCaseTitle,
        isCaseTitleRequired: requiredCaseTitle,
        newCaseButtonConfig: {
            createCaseButtonTitle: extractFieldValueFromData<I18nFieldValue>(navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_TITLE)?.defaultValue,
            createCaseButtonIcon: extractFieldValueFromData<string>(navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_ICON),
            showCreateCaseButton: extractFieldValueFromData<boolean>(navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_SHOW_CREATE_CASE_BUTTON),
        },
        blockNets: blockNetsString === undefined ? [] : blockNetsString.split(','),
    };
}
