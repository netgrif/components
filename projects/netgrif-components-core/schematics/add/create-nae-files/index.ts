import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
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
    getAppModule,
    getFileData,
    // getNaeConfiguration,
    getProjectInfo
} from '../../_utility/utility-functions';
import {addImportToModule, findNodes, insertImport} from '@schematics/angular/utility/ast-utils';
// import {getGeneratedViewClassNames} from '../../view/_utility/view-service-functions';
// import {View} from '../../../src/lib/configuration/interfaces/schema';
// import {ViewClassInfo} from '../../_commons/view-class-info';
// import {classify} from '../../_commons/angular-cli-devkit-core-strings';
import {Change} from '@schematics/angular/utility/change';
import {addImportsToAppModule} from '../../view/_utility/view-utility-functions';
import {ImportToAdd} from '../../_commons/import-to-add';


export function createNaeFiles(): Rule {
    return (/*tree: Tree*/) => {
        const rules = [];
        rules.push(createRoutesModule());
        rules.push(schematic('create-configuration-service', {}));
        rules.push(schematic('create-view-service', {}));
        rules.push(updateAppComponentHTML());
        rules.push(addInitialsImportsToAppModule());
        rules.push(updateAppComponentTS());
        // for (let index = 0; index < getNumberOfMissingViews(tree); index++) {
        //     rules.push(schematic('create-view', {}));
        // }
        return chain(rules);
    };
}

function createRoutesModule(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);
        const appRouting = tree.get(`${projectInfo.path}/app-routing.module`);
        if (appRouting) {
            commitChangesToFile(tree, appModule.fileEntry,
                addImportToModule(appModule.sourceFile, appModule.fileEntry.path, 'AppRoutingModule', './app-routing.model')
            );
            return createFilesFromTemplates('./files', projectInfo.path);
        } else {
            return addImportsToAppModule(tree, [
                new ImportToAdd('RouterModule.forRoot([])', '@angular/router')
            ]);
        }
    };
}

function addInitialsImportsToAppModule(): Rule {
    return (tree: Tree) => {
        addImportsToAppModule(tree, [
            new ImportToAdd('BrowserAnimationsModule', '@angular/platform-browser/animations')
        ]);
    };
}

// function getNumberOfMissingViews(tree: Tree): number {
//     const config = getNaeConfiguration(tree);
//     const generatedClasses = getGeneratedViewClassNames(tree);
//     const naeJsonClasses = new Set<string>();
//     Object.keys(config.views).forEach(viewPath => {
//         union(naeJsonClasses, getViewClassNames(config.views[viewPath], viewPath));
//     });
//     return naeJsonClasses.size - generatedClasses.size;
// }

// function getViewClassNames(view: View | undefined, configPath: string): Set<string> {
//     const classNames = new Set<string>();
//
//     if (view === undefined) {
//         return classNames;
//     }
//
//     if (!!view.component) {
//         classNames.add(view.component.class);
//     } else if (!!view.layout) {
//         if (!!view.layout.componentName) {
//             classNames.add(`${classify(view.layout.componentName)}Component`);
//         } else {
//             const classInfo = new ViewClassInfo(configPath, view.layout.name, view.layout.componentName);
//             classNames.add(classInfo.className);
//         }
//     } else {
//         throw new SchematicsException(`View with path '${configPath}' must have either 'layout' or 'component' attribute defined`);
//     }
//
//     if (!!view.children) {
//         Object.keys(view.children).forEach(childPath => {
//             if (view.children !== undefined) {
//                 union(classNames, getViewClassNames(view.children[childPath], `${childPath}/${childPath}`));
//             }
//         });
//     }
//     return classNames;
// }

// function union(setA: Set<string>, setB: Set<string>) {
//     setB.forEach(str => {
//         setA.add(str);
//     });
// }

function updateAppComponentHTML(): Rule {
    return (tree: Tree) => {
        const pathToComponent = getProjectInfo(tree).path + '/app.component.html';
        const content =
            `<router-outlet></router-outlet>`;
        tree.overwrite(pathToComponent, content);
    };
}

function updateAppComponentTS(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const fileData = getFileData(tree, projectInfo.path, 'app.component.ts');

        const argumentsNode = getConstructorArguments(fileData.sourceFile);
        const recorder = tree.beginUpdate(fileData.fileEntry.path);

        const injectedServices = 'private _languageService: LanguageService, private _naeRouting: RoutingBuilderService';

        if (argumentsNode !== undefined) {
            const delimiter = argumentsNode.getChildren().length > 0 ? ', ' : '';
            recorder.insertRight(argumentsNode.pos,
                `${injectedServices}${delimiter}`);
        } else {
            const classBodyToken = getClassBody(fileData.sourceFile);
            recorder.insertLeft(classBodyToken.pos,
                `constructor(${injectedServices}) {}`);
        }
        tree.commitUpdate(recorder);

        const appComponentChanges: Array<Change> = [];
        appComponentChanges.push(
            insertImport(fileData.sourceFile, fileData.fileEntry.path, 'LanguageService', '@netgrif/components-core'),
            insertImport(fileData.sourceFile, fileData.fileEntry.path, 'RoutingBuilderService', '@netgrif/components-core')
        );
        commitChangesToFile(tree, fileData.fileEntry, appComponentChanges);
    };
}

function getConstructorArguments(source: ts.SourceFile): ts.Node | undefined {
    const nodes = findNodes(source, ts.SyntaxKind.Constructor, 1, true);
    if (nodes.length === 0) {
        return undefined;
    }
    return nodes[0].getChildren().find(node => node.kind === ts.SyntaxKind.SyntaxList);
}

function getClassBody(source: ts.SourceFile): ts.Node {
    const nodes = findNodes(source, ts.SyntaxKind.ClassDeclaration, 1, true);
    if (nodes.length === 0) {
        throw new SchematicsException(`No class declaration found`);
    }

    let result;
    let foundClassToken = false;
    let foundClassBrace = false;
    for (const node of nodes[0].getChildren()) {
        if (!foundClassBrace && node.kind === ts.SyntaxKind.ClassKeyword) {
            foundClassToken = true;
            continue;
        }
        if (foundClassToken && !foundClassBrace && node.kind === ts.SyntaxKind.OpenBraceToken) {
            foundClassBrace = true;
            continue;
        }
        if (foundClassBrace && node.kind === ts.SyntaxKind.SyntaxList) {
            result = node;
            break;
        }
    }
    if (result === undefined) {
        throw new SchematicsException(`No class body found`);
    }
    return result;
}
