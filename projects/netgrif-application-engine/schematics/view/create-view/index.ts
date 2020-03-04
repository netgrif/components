import {
    Rule, schematic,
    Tree
} from '@angular-devkit/schematics';
import {getNaeConfiguration, getProjectInfo} from '../../utilityFunctions';
import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';
import {getRoutesJsonContent, Route, Routes} from '../viewUtilityFunctions';
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

    const routeMap = new Map<string, Route>();
    addAllRoutesToMap(routeMap, angularRoutes);
    return findMissingView(routeMap, naeRoutes);
}

function addAllRoutesToMap(map: Map<string, Route>, routes: Routes, pathPrefix: string = ''): void {
    routes.forEach(route => {
        if (route.path !== undefined) {
            const routePath = constructRoutePath(pathPrefix, route.path);
            map.set(routePath, route);
            if (route.children !== undefined) {
                addAllRoutesToMap(map, route.children, routePath);
            }
        }
    });
}

function findMissingView(existingRoutesMap: Map<string, Route>, naeRoutes: { [k: string]: NaeRoute }, pathPrefix: string = ''): CreateViewArguments {
    for (const routePathPart of Object.keys(naeRoutes)) {
        const route = naeRoutes[routePathPart];
        const routePath = constructRoutePath(pathPrefix, routePathPart);

        if (!existingRoutesMap.has(routePath)) {
            return {
                path: routePath,
                viewType: route.layout.name,
                layoutParams: route.layout.params,
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

function constructRoutePath(pathPrefix: string, pathPart: string): string {
    return `${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${pathPart}`;
}

function emptyArguments(routesMap: Map<string, Route>): CreateViewArguments {
    return {
        path: undefined,
        viewType: undefined,
        _routesMap: routesMap
    };
}
