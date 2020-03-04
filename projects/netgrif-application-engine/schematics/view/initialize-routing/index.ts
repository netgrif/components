import {
    Rule,
    Tree
} from '@angular-devkit/schematics';
import {getRoutesJsonContent} from "../viewUtilityFunctions";
import {getProjectInfo} from "../../utilityFunctions";
import {Route} from "@angular/router";


export function initializeRoutes(routeObject: Route, path: string): Rule {
    return (tree: Tree) => {
        const paths: String[] = path.split("/");
        const data: Route[] = getRoutesJsonContent(tree, getProjectInfo(tree));
        (paths.length == 1) ? data.push(routeObject) : updateRoutes(data, routeObject, 0, paths);
        tree.overwrite(getProjectInfo(tree).path + "/routes.json", JSON.stringify(data))
    };
}

function updateRoutes(data: Route[], routeToAdd: Route, index: number, paths: String[]): Route[] {
    for (let route of data) {
        if (route['path'] == paths[index] && paths.length - 1 == index) {
            addRoute(route, routeToAdd);
            break
        }
        if (route['path'] == paths[index]) {
            if (route.children != undefined)
                updateRoutes(route.children, routeToAdd, index + 1, paths);
        }
    }
    return data
}

function addRoute(route: Route, routeToAdd: Route) {
    if (route.children != undefined) {
        route.children.push(routeToAdd)
    } else {
        route.children = [routeToAdd];
    }
}
