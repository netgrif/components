import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';

export interface CreateViewArguments {
    path: string | undefined,
    type: NaeRoute['type'] | undefined,
    layoutParams?: NaeRoute['layout']['params']
}
