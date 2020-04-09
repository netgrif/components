import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';

export interface CreateViewArguments {
    path: string | undefined;
    viewType: NaeRoute['type'] | undefined;
    layoutParams?: NaeRoute['layout']['params'];
    access?: { [k: string]: any; } | ('public' | 'private');
}
