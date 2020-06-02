export interface Preferences {
    locale?: string;

    taskFilters: {
        [viewId: string]: Array<string>
    };

    caseFilters: {
        [viewId: string]: Array<string>
    };
    /**
     * Header preferences are strings in format: <petrinet identifier>-<datafield id> or meta-<meta identifier>
     */
    caseViewHeaders: {
        [viewId: string]: Array<string>
    };
}
