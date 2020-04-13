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
    getNaeConfiguration,
    getProjectInfo
} from '../../utility-functions';
import {addImportToModule} from '@schematics/angular/utility/ast-utils';
import {
    addAllRoutesToMap,
    constructRoutePath,
    getRoutesJsonContent,
    Route
} from '../../view/view-utility-functions';
import {Route as NaeRoute} from '../../../src/lib/configuration/interfaces/schema';

export function createNaeFiles(): Rule {
    return (tree: Tree) => {
        const rules = [];
        rules.push(createRoutesModule());
        rules.push(schematic('initialize-configuration-service', {}));
        rules.push(schematic('custom-themes', {}));
        rules.push(updateAppComponentHTML());
        for (let index = 0; index < getNumberOfMissingViews(tree); index++) {
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

function getNumberOfMissingViews(tree: Tree): number {
    const projectInfo = getProjectInfo(tree);
    const naeConfig = getNaeConfiguration(tree);
    const routesContent = getRoutesJsonContent(tree, projectInfo);
    const pathToRouteMap = new Map<string, Route>();
    addAllRoutesToMap(pathToRouteMap, routesContent);
    if (naeConfig.views.routes === undefined) {
        return 0;
    }
    return findNumberOfMissingViews(pathToRouteMap, naeConfig.views.routes);
}

function findNumberOfMissingViews(existingRoutesMap: Map<string, Route>,
                                  naeRoutes: { [k: string]: NaeRoute }, pathPrefix: string = ''): number {
    let counter = 0;
    for (const routePathPart of Object.keys(naeRoutes)) {
        const route = naeRoutes[routePathPart];
        const routePath = constructRoutePath(pathPrefix, routePathPart);
        if (!existingRoutesMap.has(routePath)) {
            counter++;
        }
        if (route.routes !== undefined) {
            counter += findNumberOfMissingViews(existingRoutesMap, route.routes, routePath);
        }
    }
    return counter;
}

function updateAppComponentHTML(): Rule {
    return (tree: Tree) => {
        const pathToComponent = getProjectInfo(tree).path + '/app.component.html';
        const content: string = '<nae-side-menu>' + '\n' + tree.read(pathToComponent) + '</nae-side-menu>';
        tree.overwrite(pathToComponent, content);
    };
}
