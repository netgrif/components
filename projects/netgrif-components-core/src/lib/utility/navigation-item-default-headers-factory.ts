import {DataGroup} from "../resources/interface/data-groups";
import {extractFieldValueFromData} from "../navigation/utility/navigation-item-task-utility-methods";
import {GroupNavigationConstants} from "../navigation/model/group-navigation-constants";


export function navigationItemCaseViewDefaultHeadersFactory(navigationItemTaskData: DataGroup[]): Array<string> | undefined {
    return navigationItemDefaultHeadersFactory(navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_USE_CASE_DEFAULT_HEADERS, GroupNavigationConstants.ITEM_FIELD_ID_CASE_DEFAULT_HEADERS)
}

export function navigationItemTaskViewDefaultHeadersFactory(navigationItemTaskData: DataGroup[]): Array<string> | undefined {
    return navigationItemDefaultHeadersFactory(navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_USE_TASK_DEFAULT_HEADERS, GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS)
}

function navigationItemDefaultHeadersFactory(navigationItemTaskData: DataGroup[], useFieldId: string, defaultHeadersFieldId: string): Array<string> | undefined {
    try {
        const isUse = extractFieldValueFromData<boolean>(navigationItemTaskData, useFieldId);
        if (isUse) {
            const defaultHeaders = extractFieldValueFromData<string>(navigationItemTaskData, defaultHeadersFieldId);
            if (defaultHeaders === undefined || defaultHeaders === "") {
                return undefined;
            }
            return defaultHeaders.split(',');
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
}
