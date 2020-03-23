import {
    Rule,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {getNaeConfiguration} from '../../utilityFunctions';


export function addViewToNaeJson(createViewArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        const naeJsonContent = getNaeConfiguration(tree);

        const pathSegments = (createViewArguments.path as string).split('/');
        let parentRoute;
        if (naeJsonContent.views.routes !== undefined) {
            parentRoute = naeJsonContent.views;
            for (let i = 0; i < pathSegments.length - 1; i++) {
                if (parentRoute.routes !== undefined) {
                    parentRoute = parentRoute.routes[pathSegments[i]];
                } else {
                    // else cannot happen because that would mean this object doesn't have a parent view
                    // such cases end with error in create-view-prompt schematic
                    // the if is necessary because of the strict typescript compiler
                    throw new SchematicsException('Illegal state. View must have all parent views defined.');
                }
            }
        } else {
            naeJsonContent.views.routes = {};
            parentRoute = naeJsonContent.views.routes;
        }

        if (parentRoute.routes === undefined) {
           parentRoute.routes = {};
        }

        if (parentRoute.routes[pathSegments[pathSegments.length - 1]] === undefined) {
            parentRoute.routes[pathSegments[pathSegments.length - 1]] = {
                layout: {
                    name: createViewArguments.viewType as string,
                    params: {}
                },
                access: 'public',
                navigation: true
            };

            tree.overwrite('nae.json', JSON.stringify(naeJsonContent, null, 4));
        }
        return tree;
    };
}
