import {
    Rule,
    Tree
} from '@angular-devkit/schematics';
import {getNaeConfiguration, getProjectInfo, ProjectInfo} from '../../utilityFunctions';
import {Route, Routes} from '@angular/router';
import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';

interface SchematicArguments {
    path: string | undefined,
    type: NaeRoute['type'] | undefined,
    layoutName: NaeRoute['layout']['name'] | undefined,
    layoutParams?: NaeRoute['layout']['params']
}

export function createView(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const naeConfig = getNaeConfiguration(tree);
        const routesContent = getRoutesJsonContent(tree, projectInfo);
        const schematicArguments = getSchematicArguments(naeConfig.views.routes, routesContent);

        console.log(schematicArguments);

        return tree;
    };
}

function getRoutesJsonContent(tree: Tree, projectInfo: ProjectInfo): Routes {
    const routes = tree.read(`${projectInfo.path}/routes.json`);
    if (!routes) {
        return [];
    }
    return JSON.parse(routes.toString());
}

function getSchematicArguments(naeRoutes: { [k: string]: NaeRoute } | undefined, angularRoutes: Routes): SchematicArguments {
    if (!naeRoutes) {
        return emptyArguments();
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

function findMissingView(existingRoutesMap: Map<string, Route>, naeRoutes: { [k: string]: NaeRoute }, pathPrefix: string = ''): SchematicArguments {
    for (const routePathPart of Object.keys(naeRoutes)) {
        const route = naeRoutes[routePathPart];
        const routePath = constructRoutePath(pathPrefix, routePathPart);

        if (!existingRoutesMap.has(routePath)) {
            return {
                path: routePath,
                type: route.type,
                layoutName: route.layout.name,
                layoutParams: route.layout.params
            };
        }

        if (route.routes !== undefined) {
            let result = findMissingView(existingRoutesMap, route.routes, routePath);
            if (result.path !== undefined) {
                return result;
            }
        }
    }
    return emptyArguments();
}

function constructRoutePath(pathPrefix: string, pathPart: string): string {
    return `${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${pathPart}`;
}

function emptyArguments(): SchematicArguments {
    return {
        path: undefined,
        type: undefined,
        layoutName: undefined
    };
}
