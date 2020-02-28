import {
    chain,
    Rule,
    Tree,
    schematic
} from '@angular-devkit/schematics';
import {Route} from '@angular/router';
import {Input} from "@angular/core";



export function initializeRoutes(routeObject: Route ,path: string): Rule {

    return (tree: Tree) => {
        path = path.split("/");

        return chain([
            schematic('create-configuration-service', {}),
        ]);
    };
}
