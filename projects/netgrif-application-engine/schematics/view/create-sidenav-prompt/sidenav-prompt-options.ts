import {CreateViewArguments} from '../create-view-prompt/schema';

export interface SidenavPromptOptions {
    user?: boolean;
    quickPanel?: boolean;
    navigation?: boolean;
    createViewArguments: CreateViewArguments;
    addRoute: boolean;
}
