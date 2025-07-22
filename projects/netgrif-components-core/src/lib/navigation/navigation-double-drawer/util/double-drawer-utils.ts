import {NavigationItem} from "../../model/navigation-configs";
import {GroupNavigationConstants} from "../../model/group-navigation-constants";
import {UriNodeResource} from "../../model/uri-resource";
import {Case} from "../../../resources/interface/case";
import {RoleAccess} from "../../../../commons/schema";

export class DoubleDrawerUtils {

    constructor() {}

    public static hasItemChildren(item: NavigationItem): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_HAS_CHILDREN)?.value;
    }

    public static hasItemAutoOpenView(item: NavigationItem): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_IS_AUTO_SELECT)?.value;
    }

    public static hasItemView(item: NavigationItem): boolean {
        return item?.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_CONTAINS_FILTER)?.value;
    }

    public static isItemAndNodeEqual(item: NavigationItem, node: UriNodeResource): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value === node.uriPath;
    }

    public static extractChildCaseIds(item: Case): string[] {
        return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CHILD_ITEM_IDS)?.value;
    }

    public static representsRootNode(item: Case): boolean {
        return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH).value === '/';
    }

    public static resolveAccessRoles(filter: Case, roleType: string): Array<RoleAccess> | undefined {
        const allowedRoles = filter.immediateData.find(f => f.stringId === roleType)?.options;
        if (!allowedRoles || Object.keys(allowedRoles).length === 0) return undefined;
        const roles = [];
        Object.keys(allowedRoles).forEach(combined => {
            const parts = combined.split(':');
            roles.push({
                processId: parts[1],
                roleId: parts[0],
            });
        });
        return roles;
    }

    public static isNodeCorrespondingToItem(node: UriNodeResource, item: NavigationItem): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value === node.uriPath
    }

    public static findTaskIdInCase(useCase: Case, transId: string): string {
        return useCase.tasks.find(taskPair => taskPair.transition === transId).task;
    }

}
