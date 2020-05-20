import {View} from '../../../src/lib/configuration/interfaces/schema';

export interface CreateViewArguments {
    path: string | undefined;
    viewType: View['layout']['name'] | undefined;
    layoutParams?: View['layout']['params'];
    access?: { [k: string]: any; } | ('public' | 'private');
}
