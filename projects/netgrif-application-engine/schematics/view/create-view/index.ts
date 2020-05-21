import {
    Rule,
    schematic,
    Tree,
    SchematicsException
} from '@angular-devkit/schematics';
import {getNaeConfiguration} from '../../utility-functions';
import {View} from '../../../src/lib/configuration/interfaces/schema';
import {constructRoutePath, createAppRoutesMap, Route} from '../view-utility-functions';
import {CreateViewArguments} from '../create-view-prompt/schema';

export function createView(): Rule {
    return (tree: Tree) => {
        const naeConfig = getNaeConfiguration(tree);
        return schematic('create-view-prompt', getSchematicArguments(naeConfig.views.routes, tree));
    };
}

function getSchematicArguments(naeRoutes: { [k: string]: View } | undefined, tree: Tree): CreateViewArguments {
    if (!naeRoutes) {
        return emptyArguments();
    }
    const pathToRouteMap = createAppRoutesMap(tree);
    return findMissingView(pathToRouteMap, naeRoutes);
}


function findMissingView(existingRoutesMap: Map<string, Route>, naeRoutes: { [k: string]: View },
                         pathPrefix: string = ''): CreateViewArguments {
    for (const routePathPart of Object.keys(naeRoutes)) {
        const route = naeRoutes[routePathPart];
        const routePath = constructRoutePath(pathPrefix, routePathPart);

        // temporary schematic fix
        if (route.layout === undefined) {
            throw new SchematicsException('Missing \'layout\' property. Other behavior is currently unsupported');
        }

        if (!existingRoutesMap.has(routePath)) {
            return {
                path: routePath,
                viewType: route.layout.name,
                layoutParams: route.layout.params,
                access: route.access,
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
        path: '',
        viewType: '',
        access: 'private' as 'private'
    };
}
