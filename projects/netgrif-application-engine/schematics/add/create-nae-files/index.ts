import {
    chain,
    Rule,
    Tree,
    schematic
} from '@angular-devkit/schematics';
import {
    commitChangesToFile,
    createFilesFromTemplates,
    getAppModule,
    getProjectInfo
} from '../../_utility/utility-functions';
import {addImportToModule} from '@schematics/angular/utility/ast-utils';


export function createNaeFiles(): Rule {
    return () => {
        const rules = [];
        rules.push(createRoutesModule());
        rules.push(schematic('create-configuration-service', {}));
        rules.push(schematic('create-view-service', {}));
        rules.push(schematic('custom-themes', {}));
        rules.push(updateAppComponentHTML());
        for (let index = 0; index < getNumberOfMissingViews(); index++) {
            rules.push(schematic('create-view', {}));
        }
        return chain(rules);
    };
}

function createRoutesModule(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);
        commitChangesToFile(tree, appModule.fileEntry,
            addImportToModule(appModule.sourceFile, appModule.fileEntry.path, 'AppRoutingModule', './app-routing.module')
        );
        return createFilesFromTemplates('./files', projectInfo.path);
    };
}

function getNumberOfMissingViews(): number {
    return 0;
    // const projectInfo = getProjectInfo(tree);
    // const naeConfig = getNaeConfiguration(tree);
    // const routesContent = getRoutesJsonContent(tree, projectInfo);
    // const pathToRouteMap = new Map<string, Route>();
    // addAllRoutesToMap(pathToRouteMap, routesContent);
    // if (naeConfig.views.routes === undefined) {
    //     return 0;
    // }
    // return findNumberOfMissingViews(pathToRouteMap, naeConfig.views.routes);
}

// function findNumberOfMissingViews(existingRoutesMap: Map<string, Route>,
//                                   naeRoutes: { [k: string]: View }, pathPrefix: string = ''): number {
//     let counter = 0;
//     for (const routePathPart of Object.keys(naeRoutes)) {
//         const route = naeRoutes[routePathPart];
//         const routePath = constructRoutePath(pathPrefix, routePathPart);
//         if (!existingRoutesMap.has(routePath)) {
//             counter++;
//         }
//         if (route.routes !== undefined) {
//             counter += findNumberOfMissingViews(existingRoutesMap, route.routes, routePath);
//         }
//     }
//     return counter;
// }

function updateAppComponentHTML(): Rule {
    return (tree: Tree) => {
        const pathToComponent = getProjectInfo(tree).path + '/app.component.html';
        const content: string = '<nae-side-menu>' + '\n' + tree.read(pathToComponent) + '</nae-side-menu>';
        tree.overwrite(pathToComponent, content);
    };
}
