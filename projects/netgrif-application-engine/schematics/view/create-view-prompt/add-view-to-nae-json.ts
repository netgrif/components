import {
    Rule,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {getNaeConfiguration} from '../../utility-functions';
import {View} from '../../../src/lib/configuration/interfaces/schema';


export function addViewToNaeJson(createViewArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        const naeJsonContent = getNaeConfiguration(tree);

        const pathSegments = (createViewArguments.path as string).split('/');
        const lastPathSegment = pathSegments[pathSegments.length - 1];

        if (pathSegments.length === 1) {
            if (naeJsonContent.views === undefined) {
                naeJsonContent.views = {};
            }
            naeJsonContent[lastPathSegment] = createViewObject(createViewArguments, lastPathSegment);
        } else {
            let parentRoute = naeJsonContent.views[pathSegments[0]];

            for (let i = 1; i < pathSegments.length - 1; i++) {
                if (parentRoute.children !== undefined) {
                    parentRoute = parentRoute[pathSegments[i]].children;
                } else {
                    // else cannot happen because that would mean this object doesn't have a parent view
                    // such cases end with error in create-view-prompt schematic
                    // the if is necessary because of the strict typescript compiler
                    throw new SchematicsException('Illegal state. View must have all parent views defined.');
                }
            }

            if (parentRoute.children === undefined) {
                parentRoute.children = {};
            }
            parentRoute.children[lastPathSegment] = createViewObject(createViewArguments, lastPathSegment);
        }
        tree.overwrite('nae.json', JSON.stringify(naeJsonContent, null, 4));
        return tree;
    };
}

function createViewObject(createViewArguments: CreateViewArguments, lastPathSegment: string): View {
    return {
        layout: {
            name: createViewArguments.viewType as string,
            params: (createViewArguments.layoutParams === undefined) ? {} : createViewArguments.layoutParams
        },
        access: createViewArguments.access,
        navigation: true,
        routing: {
            path: lastPathSegment
        }
    };
}
