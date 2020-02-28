import {
    chain,
    Rule,
    Tree,
    schematic,
} from '@angular-devkit/schematics';

import {
    getNaeConfigurationString,
    getProjectInfo
} from "../utilityFunctions";


import {Resource, Resources} from "@netgrif/application-engine/lib/configuration/interfaces/schema";


function createResouce(resource : Resource) {
    console.log(resource);
    createSchematic()
}


export function initializeResources(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const resorcesConfig: Resources = JSON.parse(getNaeConfigurationString(tree)).providers.resources;

        console.log(projectInfo);
        console.log(resorcesConfig);
        console.log("--------------------------------------------------------------");

        if (resorcesConfig instanceof Array) {
            resorcesConfig.forEach(resource => {
                createResouce(resource)
            } )

        } else {
            createResouce(resorcesConfig)

        }


        return chain([
            // schematic('create-configuration-service', {}),
        ]);
    };
}
