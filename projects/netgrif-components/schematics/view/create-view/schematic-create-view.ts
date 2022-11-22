import {
    Rule,
    schematic,
    Tree,
    chain,
    SchematicsException
} from '@angular-devkit/schematics';
import {getNaeConfiguration} from '../../_utility/utility-functions';
import {NullableCreateViewArguments} from './models/nullable-create-view-arguments';
import {constructRoutePath} from '../_utility/view-utility-functions';
import {ViewClassInfo} from '../../_commons/view-class-info';
import {getGeneratedViewClassNames} from '../_utility/view-service-functions';
import {Views} from '@netgrif/components-core';


export function schematicEntryPoint(): Rule {
    return (tree: Tree) => {
        const naeConfig = getNaeConfiguration(tree);
        let arrayCreateSchematic: Array<Rule> = [];
        getSchematicArguments(tree, naeConfig.views).forEach(it => {
            arrayCreateSchematic.push(schematic('create-view-prompt', it))
        })
        return chain(arrayCreateSchematic);
    };
}

function getSchematicArguments(tree: Tree, naeViews: Views): Array<NullableCreateViewArguments> {
    if (Object.keys(naeViews).length === 0) {
        return [emptyArguments()];
    }
    const generatedViews = getGeneratedViewClassNames(tree);
    const arrayMissingView = findMissingView(naeViews, generatedViews).filter(filterUndefined);
    return arrayMissingView.length === 0 ? [emptyArguments()] : arrayMissingView;
}

function filterUndefined(item: NullableCreateViewArguments) {
    return item.path !== undefined;
}

/**
 * Finds the first view that is declared in `nae.json` but was not yet generated in the app.
 * @param naeViews configuration holding all the views from one level and their children
 * @param generatedViews class names of views that have already been generated
 * @param pathPrefix web path prefix common to all views of the given level
 * @returns [CreateViewArguments]{@link CreateViewArguments} of the missing view.
 * Arguments will be empty (and thus a prompt will be displayed) if no missing views exist
 */
function findMissingView(naeViews: Views, generatedViews: Set<string>, pathPrefix: string = ''): Array<NullableCreateViewArguments> {
    let arrayMissingView: Array<NullableCreateViewArguments> = [];
    for (const pathSegment of Object.keys(naeViews)) {
        const view = naeViews[pathSegment];
        const viewPath = constructRoutePath(pathPrefix, pathSegment);

        if (viewPath === undefined) {
            throw new SchematicsException(`Please set viewPath! (PathSegment: ${pathSegment} )`);
        }

        if (view.layout === undefined && view.component === undefined) {
            throw new SchematicsException(
                `View must have either the 'layout' or the 'component' attribute defined! (Path: ${viewPath} )`);
        }

        if (!!view.layout) {
            if (view.layout.name === 'groupNavigation') {
                continue;
            }
            const viewClassInfo = new ViewClassInfo(viewPath, view.layout.name, view.layout.componentName);
            if (!generatedViews.has(viewClassInfo.className)) {
                arrayMissingView.push({
                    path: viewPath,
                    viewType: view.layout.name,
                    componentName: view.layout.componentName,
                    layoutParams: view.layout.params,
                    access: view.access,
                    enableCaseTitle: view.layout.enableCaseTitle,
                    isCaseTitleRequired: view.layout.isCaseTitleRequired,
                    showDeleteMenu: view.layout.showDeleteMenu,
                    confirmWorkflowDeletion: view.layout.confirmWorkflowDeletion
                });
            }
        } else {
            if (view.component !== undefined && !generatedViews.has(view.component.class)) {
                arrayMissingView.push({
                    path: viewPath,
                    viewType: 'customView',
                    componentName: view.component.class,
                    customImportPath: view.component.from,
                    access: view.access
                });
            }
        }
        if (!!view.children) {
            const result = findMissingView(view.children, generatedViews, viewPath);
            arrayMissingView.push(...result);
        }
    }

    return arrayMissingView;
}

function emptyArguments(): NullableCreateViewArguments {
    return {
        path: undefined,
        viewType: undefined,
        componentName: undefined,
        access: undefined
    };
}
