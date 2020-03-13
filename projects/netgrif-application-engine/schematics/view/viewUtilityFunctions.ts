import {Tree} from "@angular-devkit/schematics";
import {ProjectInfo} from "../utilityFunctions";

/**
 * Mocks the `Route` interface of {@link @angular/router#Route | Angular's router package}. But changes the type of the `component` attribute to `string`.
 */
export interface Route{
    component: string;
    path: string;
    children?: Array<Route>
}

export declare type Routes = Route[];

export function getRoutesJsonContent(tree: Tree, projectInfo: ProjectInfo): Array<Route> {
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
    return path.substring(0, index)
}
