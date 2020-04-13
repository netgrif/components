import {CreateViewArguments} from '../../schema';

export interface SidenavPromptOptions {
    user?: boolean;
    quickPanel?: boolean;
    navigation?: boolean;
    createViewArguments: CreateViewArguments;
    addRoute: boolean;
}
