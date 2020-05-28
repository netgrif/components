import {
    chain,
    Rule,
    Tree,
    schematic,
    SchematicsException
} from '@angular-devkit/schematics';
import {
    commitChangesToFile,
    createFilesFromTemplates,
    getAppModule, getNaeConfiguration,
    getProjectInfo
} from '../../_utility/utility-functions';
import {addImportToModule} from '@schematics/angular/utility/ast-utils';
import {getGeneratedViewClassNames} from '../../view/_utility/view-service-functions';
import {View} from '../../../src/lib/configuration/interfaces/schema';
import {ViewClassInfo} from '../../_commons/view-class-info';
import {classify} from '../../_commons/angular-cli-devkit-core-strings';


export function createNaeFiles(): Rule {
    return (tree: Tree) => {
        const rules = [];
        rules.push(createRoutesModule());
        rules.push(schematic('create-configuration-service', {}));
        rules.push(schematic('create-view-service', {}));
        rules.push(schematic('custom-themes', {}));
        rules.push(updateAppComponentHTML());
        for (let index = 0; index < getNumberOfMissingViews(tree); index++) {
            rules.push(schematic('create-view', {}));
        }
        return chain(rules);
    };
}

function createRoutesModule(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);
        commitChangesToFile(tree, appModule.fileEntry,
            addImportToModule(appModule.sourceFile, appModule.fileEntry.path, 'AppRoutingModule', './app-routing.module')
        );
        return createFilesFromTemplates('./files', projectInfo.path);
    };
}

function getNumberOfMissingViews(tree: Tree): number {
    const config = getNaeConfiguration(tree);
    const generatedClasses = getGeneratedViewClassNames(tree);
    const naeJsonClasses = new Set<string>();
    Object.keys(config.views).forEach(viewPath => {
        union(naeJsonClasses, getViewClassNames(config.views[viewPath], viewPath));
    });
    return naeJsonClasses.size - generatedClasses.size;
}

function getViewClassNames(view: View | undefined, configPath: string): Set<string> {
    const classNames = new Set<string>();

    if (view === undefined) {
        return classNames;
    }

    if (!!view.component) {
        classNames.add(view.component.class);
    } else if (!!view.layout) {
        if (!!view.layout.componentName) {
            classNames.add(`${classify(view.layout.componentName)}Component`);
        } else {
            const classInfo = new ViewClassInfo(configPath, view.layout.name, view.layout.componentName);
            classNames.add(classInfo.className);
        }
    } else {
        throw new SchematicsException(`View with path '${configPath}' must have either 'layout' or 'component' attribute defined`);
    }

    if (!!view.children) {
        Object.keys(view.children).forEach(childPath => {
            if (view.children !== undefined) {
                union(classNames, getViewClassNames(view.children[childPath], `${childPath}/${childPath}`));
            }
        });
    }
    return classNames;
}

function union(setA: Set<string>, setB: Set<string>) {
    setB.forEach(str => {
        setA.add(str);
    });
}

function updateAppComponentHTML(): Rule {
    return (tree: Tree) => {
        const pathToComponent = getProjectInfo(tree).path + '/app.component.html';
        const content =
            `<nae-routing></nae-routing>
<nae-side-menu-container>
    <router-outlet></router-outlet>
</nae-side-menu-container>`;
        tree.overwrite(pathToComponent, content);
    };
}
