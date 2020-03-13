import {
    Rule,
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
        tree.overwrite(getProjectInfo(tree).path + '/routes.json', JSON.stringify(data));
    };
}

function updateRoutes(data: Route[], routeToAdd: Route, index: number, paths: string[]): Route[] {
    for (const route of data) {
        if (route['path'] === paths[index] && paths.length - 1 === index) {
            addRoute(route, routeToAdd);
            break;
        }
        if (route['path'] === paths[index]) {
            if (route.children !== undefined)
                updateRoutes(route.children, routeToAdd, index + 1, paths);
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
