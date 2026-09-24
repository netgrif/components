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
        return item?.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_IS_AUTO_SELECT)?.value;
    }

    public static hasItemView(item: NavigationItem): boolean {
        return item?.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_CONTAINS_FILTER)?.value;
    }

    public static isItemAndNodeEqual(item: NavigationItem, node: UriNodeResource): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value === node.uriPath;
    }

    public static extractChildCaseIds(item: Case): string[] {
        return item?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CHILD_ITEM_IDS)?.value;
    }

    /**
     * Resolves order configured either on a process menu item or on a custom nae.json navigation item.
     */
    public static resolveOrder(item: NavigationItem): number | undefined {
        const navigationOrder = typeof item?.navigation === 'object' ? item.navigation.order : undefined;
        const processOrder = item?.resource?.immediateData
            .find(field => field.stringId === GroupNavigationConstants.ITEM_FIELD_ID_ORDER)?.value;
        const order = navigationOrder ?? processOrder;

        return typeof order === 'number' && Number.isFinite(order) ? order : undefined;
    }

    /**
     * Applies optional explicit order over the caller-provided fallback order. Process items must be supplied in
     * childItemIds order; custom nae.json items follow in their declaration order. Equal or missing values keep that
     * stable fallback, while every item without an explicit order is placed after explicitly ordered items.
     */
    public static sortByOrder(items: Array<NavigationItem>): Array<NavigationItem> {
        return items
            .map((item, index) => ({item, index, order: this.resolveOrder(item)}))
            .sort((first, second) => {
                if (first.order === undefined && second.order === undefined) {
                    return first.index - second.index;
                }
                if (first.order === undefined) {
                    return 1;
                }
                if (second.order === undefined) {
                    return -1;
                }
                return first.order - second.order || first.index - second.index;
            })
            .map(entry => entry.item);
    }

    public static representsRootNode(item: Case): boolean {
        return item?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH).value === '/';
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
