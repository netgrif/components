import {
    Rule,
    Tree
} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {getNaeConfiguration} from '../../utilityFunctions';
import {createAppRoutesMap} from '../viewUtilityFunctions';


export function addViewToNaeJson(createViewArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        const routesMap = createAppRoutesMap(tree);
        if (routesMap.has(createViewArguments.path as string)) {
            return tree;
        } else {
            const naeJsonContent = getNaeConfiguration(tree);

            const pathSegments = (createViewArguments.path as string).split('/');
            let parentRoute;
            if (naeJsonContent.views.routes !== undefined) {
                parentRoute = naeJsonContent.views.routes;
                for (let i = 0; i < pathSegments.length - 1; i++) {
                    parentRoute = parentRoute[pathSegments[i]];
                }
            } else {
                naeJsonContent.views.routes = {};
                parentRoute = naeJsonContent.views.routes;
            }

            parentRoute[pathSegments[pathSegments.length - 1]] = {
                layout: {
                    name: createViewArguments.viewType as string,
                    params: {}
                },
                access: 'public',
                navigation: true
            };

            tree.overwrite('nae.json', JSON.stringify(naeJsonContent, null, 4));
            return tree;
        }
    };
}
