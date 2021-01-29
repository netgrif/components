export interface Preferences {
    locale?: string;

    drawerWidth?: number;

    taskFilters: {
        [viewId: string]: Array<string>
    };

    caseFilters: {
        [viewId: string]: Array<string>
    };

    /**
     * Header preferences are strings in format: <petrinet identifier>-<datafield id> or meta-<meta identifier>
     */
    headers: {
        [viewId: string]: Array<string>
    };
}
