import {
    Rule,
    schematic,
    Tree
} from '@angular-devkit/schematics';
import {getNaeConfiguration, getProjectInfo} from '../../utilityFunctions';
import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';
import {addAllRoutesToMap, constructRoutePath, getRoutesJsonContent, Route, Routes} from '../viewUtilityFunctions';
import {CreateViewArguments} from '../create-view-prompt/schema';

export function createView(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const naeConfig = getNaeConfiguration(tree);
        const routesContent = getRoutesJsonContent(tree, projectInfo);
        const schematicArguments = getSchematicArguments(naeConfig.views.routes, routesContent);
        return schematic('create-view-prompt', schematicArguments);
    };
}

function getSchematicArguments(naeRoutes: { [k: string]: NaeRoute } | undefined, angularRoutes: Routes): CreateViewArguments {
    if (!naeRoutes) {
        return emptyArguments(new Map<string, Route>());
    }

    const pathToRouteMap = new Map<string, Route>();
    addAllRoutesToMap(pathToRouteMap, angularRoutes);
    return findMissingView(pathToRouteMap, naeRoutes);
}


function findMissingView(existingRoutesMap: Map<string, Route>, naeRoutes: { [k: string]: NaeRoute }, pathPrefix: string = ''): CreateViewArguments {
    for (const routePathPart of Object.keys(naeRoutes)) {
        const route = naeRoutes[routePathPart];
        const routePath = constructRoutePath(pathPrefix, routePathPart);

        if (!existingRoutesMap.has(routePath)) {
            return {
                path: routePath,
                viewType: route.view.name,
                layoutParams: route.view.params,
                _routesMap: existingRoutesMap
            };
        }

        if (route.routes !== undefined) {
            let result = findMissingView(existingRoutesMap, route.routes, routePath);
            if (result.path !== undefined) {
                return result;
            }
        }
    }
    return emptyArguments(existingRoutesMap);
}

function emptyArguments(routesMap: Map<string, Route>): CreateViewArguments {
    return {
        path: undefined,
        viewType: undefined,
        _routesMap: routesMap
    };
}
