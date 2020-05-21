import {View as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';

export interface CreateViewArguments {
    path: string | undefined;
    viewType: NaeRoute['layout']['name'] | undefined;
    layoutParams?: NaeRoute['layout']['params'];
    access: { [k: string]: any; } | ('public' | 'private');
}
