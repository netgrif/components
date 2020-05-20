import {View} from '../../../../src/lib/configuration/interfaces/schema';

export interface TabViewParams {
    tabs: Array<EmbeddedView>;
    defaultTaskView?: EmbeddedView;
}

export interface EmbeddedView {
    view?: {
        name: string,
        params?: View['layout']['params']
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
    canBeClosed?: boolean;
    order?: number;
}
