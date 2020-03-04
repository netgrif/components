import {
    apply, applyTemplates, mergeWith, move,
    Rule,
    Tree, url,
} from '@angular-devkit/schematics';
import {getProjectInfo} from '../../utilityFunctions';
import {normalize} from "@angular-devkit/core";
import {getRoutesJsonContent} from "../viewUtilityFunctions";
import {Route} from "@angular/router";


export function updateCreateRouteModule(): Rule {
    return (tree: Tree) => {
        testFindNode(tree);
        let data: Route[] = getRoutesJsonContent(tree, getProjectInfo(tree));
        const routeModuleTemplate = apply(url('./files'), [
            applyTemplates({
                routes: getRoutesFromJson(data, [])
            }),
            move(normalize(getProjectInfo(tree).path))
        ]);

        return mergeWith(routeModuleTemplate);
    };
}

// function checkFileExistance(tree: Tree): boolean {
//     return tree.exists(getProjectInfo(tree).path + "/routes.module.ts");
// }

function getRoutesFromJson(data: Route[], dataToReturn: String[]): any[] {
    for (let route of data) {
        dataToReturn.push(removeQuotesOnRout(JSON.stringify(route).trim()));
    }
    return dataToReturn
}

function removeQuotesOnRout(phrase: String): String {
    phrase!.match(/.component":(.\w+.)/g)!.forEach(value => {
        phrase = phrase.replace(value, value.split('"').join(""));
    });
    return phrase;
}

function testFindNode(tree: Tree) {
console.log(tree)
}
