import {LayoutContainer} from '../resources/interface/layout-container';

export function callActionRecursively(layoutContainer: LayoutContainer, params: { doParams: any, termParams: any }, doFunction: Function, terminalCondition: Function): any {
    for (let layoutItem of layoutContainer.items) {
        if (!!layoutItem.field) {
            doFunction(layoutItem, params.doParams);
        }
        if (terminalCondition(layoutItem, params.termParams)) {
            break;
        }
        if (!!layoutItem.container) {
            callActionRecursively(layoutItem.container, params, doFunction, terminalCondition);
        }
    }
}
