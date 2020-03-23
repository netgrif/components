import {
    Rule,
    schematic,
    Tree
} from '@angular-devkit/schematics';
import {getNaeConfiguration} from '../../utilityFunctions';
import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';
import {constructRoutePath, createRoutesMap, Route} from '../viewUtilityFunctions';
import {CreateViewArguments} from '../create-view-prompt/schema';

export function createView(): Rule {
    return (tree: Tree) => {
        const naeConfig = getNaeConfiguration(tree);
        return schematic('create-view-prompt', getSchematicArguments(naeConfig.views.routes, tree));
    };
}

function getSchematicArguments(naeRoutes: { [k: string]: NaeRoute } | undefined, tree: Tree): CreateViewArguments {
    if (!naeRoutes) {
        return emptyArguments();
    }
    const pathToRouteMap = createRoutesMap(tree);
    return findMissingView(pathToRouteMap, naeRoutes);
}


function findMissingView(existingRoutesMap: Map<string, Route>, naeRoutes: { [k: string]: NaeRoute },
                         pathPrefix: string = ''): CreateViewArguments {
    for (const routePathPart of Object.keys(naeRoutes)) {
        const route = naeRoutes[routePathPart];
        const routePath = constructRoutePath(pathPrefix, routePathPart);

        if (!existingRoutesMap.has(routePath)) {
            return {
                path: routePath,
                viewType: route.view.name,
                layoutParams: route.view.params
            };
        }

        if (route.routes !== undefined) {
            const result = findMissingView(existingRoutesMap, route.routes, routePath);
            if (result.path !== undefined) {
                return result;
            }
        }
    }
    return emptyArguments();
}

function emptyArguments(): CreateViewArguments {
    return {
        path: undefined,
        viewType: undefined
    };
}
