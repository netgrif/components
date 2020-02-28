import {Tree} from "@angular-devkit/schematics";
import {Routes} from "@angular/router";
import {ProjectInfo} from "../utilityFunctions";

export function getRoutesJsonContent(tree: Tree, projectInfo: ProjectInfo): Routes {
    const routes = tree.read(`${projectInfo.path}/routes.json`);
    if (!routes) {
        return [];
    }
    return JSON.parse(routes.toString());
}

export function getParentPath(path: string): string {
    const index = path.lastIndexOf('/');
    if (index === -1) {
        return '';
    }
    return path.substring(0, index-1)
}
