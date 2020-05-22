import {
    Rule,
    schematic
} from '@angular-devkit/schematics';
import {CreateViewArguments} from '../create-view-prompt/schema';

export function createView(): Rule {
    return () => {
        // const naeConfig = getNaeConfiguration(tree);
        return schematic('create-view-prompt', getSchematicArguments());
    };
}

function getSchematicArguments(): CreateViewArguments {
    // if (!naeRoutes) {
        return emptyArguments();
    // }
    // const pathToRouteMap = createAppRoutesMap(tree);
    // return findMissingView(pathToRouteMap, naeRoutes);
}


// function findMissingView(existingRoutesMap: Map<string, Route>, naeRoutes: { [k: string]: View },
//                          pathPrefix: string = ''): CreateViewArguments {
//     for (const routePathPart of Object.keys(naeRoutes)) {
//         const route = naeRoutes[routePathPart];
//         const routePath = constructRoutePath(pathPrefix, routePathPart);
//
//         // temporary schematic fix
//         if (route.layout === undefined) {
//             throw new SchematicsException('Missing \'layout\' property. Other behavior is currently unsupported');
//         }
//
//         if (!existingRoutesMap.has(routePath)) {
//             return {
//                 path: routePath,
//                 viewType: route.layout.name,
//                 layoutParams: route.layout.params,
//                 access: route.access,
//             };
//         }
//
//         if (route.routes !== undefined) {
//             const result = findMissingView(existingRoutesMap, route.routes, routePath);
//             if (result.path !== undefined) {
//                 return result;
//             }
//         }
//     }
//     return emptyArguments();
// }

function emptyArguments(): CreateViewArguments {
    return {
        path: '',
        viewType: '',
        access: 'private' as 'private'
    };
}
