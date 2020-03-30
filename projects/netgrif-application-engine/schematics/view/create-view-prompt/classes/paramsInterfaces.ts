import {Route as NaeRoute} from '../../../../src/lib/configuration/interfaces/schema';

export interface TabViewParams {
    tabs: Array<EmbeddedView>;
    defaultTaskView?: EmbeddedView;
}

interface EmbeddedView {
    view?: {
        name: string,
        params?: NaeRoute['layout']['params']
    };
    component?: {
        class: string,
        /**
         *  path relative to app root directory
         */
        classPath: string
    };
    label?: {
        icon?: string,
        text?: string
    };
    canBeDeleted?: boolean;
    order?: number;
}
