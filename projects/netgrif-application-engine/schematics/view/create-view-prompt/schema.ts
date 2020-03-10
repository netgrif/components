import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';
import {Route} from '../viewUtilityFunctions';

export interface CreateViewArguments {
    path: string | undefined,
    viewType: NaeRoute['type'] | undefined,
    layoutParams?: NaeRoute['layout']['params'],
    _routesMap: Map<string, Route>
}
