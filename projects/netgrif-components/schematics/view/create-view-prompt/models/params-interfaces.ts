export interface TabViewParams {
    tabs: Array<EmbeddedView>;
    defaultTaskView?: EmbeddedView;
}

export interface EmbeddedView {
    view?: {
        name: string,
        params?: {[k: string]: any},
        componentName?: string
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
    canBeClosed: boolean;
    order?: number;
    enableCaseTitle?: boolean;
    isCaseTitleRequired?: boolean;
}
