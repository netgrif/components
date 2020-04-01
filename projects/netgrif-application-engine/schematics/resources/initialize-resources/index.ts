import {chain, Rule, schematic, Tree} from '@angular-devkit/schematics';
import {getNaeConfiguration} from '../../utilityFunctions';
import {Resource, Resources} from '../../../src/lib/configuration/interfaces/schema';


function createResouce(resource: Resource) {
    return schematic('market-resource', {name: resource.name, type: resource.format, address: resource.address});
}

export function initializeResources(): Rule {
    return (tree: Tree) => {
        const resorcesConfig: Resources = getNaeConfiguration(tree).providers.resources;
        const rules = [];
        if (resorcesConfig instanceof Array) {
            resorcesConfig.forEach(resource => {
                rules.push(createResouce(resource));
            });
        } else {
            rules.push(createResouce(resorcesConfig));
        }

        return chain(rules);
    };
}

