import {CreateViewArguments} from './create-view-arguments';

export interface SidenavPromptOptions {
    user?: boolean;
    quickPanel?: boolean;
    navigation?: boolean;
    createViewArguments: CreateViewArguments;
    addViewToService: boolean;
}
