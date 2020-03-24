import {
    Rule,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {getRoutesJsonContent, Route} from '../viewUtilityFunctions';
import {getProjectInfo} from '../../utilityFunctions';
import {AddRouteArguments} from '../create-view/schema';

export function addRouteToRoutes(schematicArguments: AddRouteArguments): Rule {
    return (tree: Tree) => {
        const paths: string[] = schematicArguments.path.split('/');
        const data: Route[] = getRoutesJsonContent(tree, getProjectInfo(tree));
        (paths.length === 1) ? data.push(schematicArguments.routeObject) : updateRoutes(data, schematicArguments.routeObject, 0, paths);

        // overwrite fails if the file doesn't exist
        const routesJsonPath = `${getProjectInfo(tree).path}/routes.json`;
        if (tree.exists(routesJsonPath)) {
            tree.overwrite(routesJsonPath, JSON.stringify(data, null, 4));
        } else {
            tree.create(routesJsonPath, JSON.stringify(data, null, 4));
        }
    };
}

function updateRoutes(data: Route[], routeToAdd: Route, index: number, paths: string[]): Route[] {
    for (const route of data) {
        if (route.path === paths[index] && index + 2 === paths.length) {
            addRoute(route, routeToAdd);
        } else if (route.path === paths[index]) {
            if (route.children !== undefined) {
                updateRoutes(route.children, routeToAdd, index + 1, paths);
            } else {
                throw new SchematicsException(`Parent route doesn't exist! Route '${paths.join('/')}' misses some of it's parent routes.`);
            }
        }
    }
    return data;
}

function addRoute(route: Route, routeToAdd: Route) {
    if (route.children !== undefined) {
        route.children.push(routeToAdd);
    } else {
        route.children = [routeToAdd];
    }
}
