import {
    chain,
    Rule,
    schematic,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {
    addRoutingModuleImport,
    getParentPath,
    Route,
    updateAppModule
} from '../viewUtilityFunctions';
import {
    commitChangesToFile,
    createFilesFromTemplates,
    createRelativePath,
    getAppModule,
    getProjectInfo
} from '../../utilityFunctions';
import {strings} from '@angular-devkit/core';
import {CreateViewArguments} from './schema';
import {ImportToAdd} from './classes/ImportToAdd';
import {ClassName} from './classes/ClassName';
import {TabViewParams} from './classes/paramsInterfaces';
import {TabContentTemplate} from './classes/TabContentTemplate';
import {addEntryComponentToModule} from '@schematics/angular/utility/ast-utils';


interface TabViews {
    rules: Array<Rule>;
    tabTemplates: Array<TabContentTemplate>;
    tabViewImports: Array<ImportToAdd>;
    entryComponentsImports: Array<ImportToAdd>;
}

export function createViewPrompt(schematicArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        checkPathValidity(schematicArguments.path, schematicArguments._routesMap);
        return createView(tree, schematicArguments);
    };
}

function checkPathValidity(path: string | undefined, routeMap: Map<string, Route>) {
    if (path === undefined) {
        throw new SchematicsException(`Path cannot be undefined!`);
    }
    // if the path was entered from a prompt, it might not have a parent
    const parentPath = getParentPath(path);
    if (parentPath !== '' && !routeMap.has(parentPath)) {
        throw new SchematicsException(`Parent view doesn't exist! Create a view with '${parentPath}' path first.`);
    }
}

function createView(tree: Tree, args: CreateViewArguments, addRoute: boolean = true): Rule {
    switch (args.viewType) {
        case 'login':
            return createLoginView(tree, args, addRoute);
        case 'tabView':
            return createTabView(tree, args, addRoute);
        default:
            throw new SchematicsException(`Unknown view type '${args.viewType}'`);
    }
}

function createLoginView(tree: Tree, args: CreateViewArguments, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ClassName(args.path as string, resolveClassSuffixForView('login'));

    rules.push(createFilesFromTemplates('./files/login', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify
    }));

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('CardModule', '@netgrif/application-engine')]);

    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);

        rules.push(schematic('add-route', {
            routeObject: createRouteObject(args.path as string, className.name),
            path: args.path
        }));
    }
    return chain(rules);
}

function createTabView(tree: Tree, args: CreateViewArguments, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const className = new ClassName(args.path as string, resolveClassSuffixForView('tabView'));

    const tabViews = processTabViewContents(tree, args.layoutParams as TabViewParams, args.path as string, className);

    const rules = tabViews.rules;

    rules.push(createFilesFromTemplates('./files/tabView', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        tabs: tabViews.tabTemplates,
        imports: tabViews.tabViewImports,
        dasherize: strings.dasherize,
        classify: strings.classify
    }));

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('TabsModule', '@netgrif/application-engine')]);

    tabViews.entryComponentsImports.forEach(imp => {
        // the tree/fileEntry gets updated with every iteration, so we need to get the current state every time
        const appModule = getAppModule(tree, projectInfo.path);
        const changes = addEntryComponentToModule(appModule.sourceFile, appModule.fileEntry.path, imp.className, imp.importPath);
        commitChangesToFile(tree, appModule.fileEntry, changes);
    });

    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);

        rules.push(schematic('add-route', {
            routeObject: createRouteObject(args.path as string, className.name),
            path: `${args.path}`
        }));
        rules.push(schematic('add-route', {
            routeObject: createRouteObject(`${args.path}/**`, className.name),
            path: `${args.path}/**`
        }));
    }
    return chain(rules);
}

function createRouteObject(path: string, className: string): Route {
    const index = path.lastIndexOf('/');
    let relevantPath = path;
    if (index !== -1) {
        relevantPath = path.substring(index + 1);
    }
    return {path: relevantPath, component: className};
}

function processTabViewContents(tree: Tree, tabViewParams: TabViewParams, tabViewPath: string, tabClassName: ClassName): TabViews {
    const result: TabViews = {
        rules: [],
        tabTemplates: [],
        tabViewImports: [],
        entryComponentsImports: []
    };

    if (tabViewParams.tabs === undefined) {
        return result;
    }

    let viewCounter = 0;
    tabViewParams.tabs.forEach(tab => {
        let tabTemplate: TabContentTemplate;
        if (tab.component !== undefined) {
            if (tab.component.class === undefined || tab.component.classPath === undefined) {
                throw new SchematicsException('TabView content Component must define both a \'class\' and a \'classPath\' attribute');
            }

            if ( !tab.component.classPath.startsWith('./')) {
               tab.component.classPath = `./${tab.component.classPath}`;
            }

            result.tabViewImports.push(
                new ImportToAdd(tab.component.class, createRelativePath(tabClassName.fileImportPath, tab.component.classPath))
            );
            result.entryComponentsImports.push(new ImportToAdd(tab.component.class, tab.component.classPath));

            tabTemplate = new TabContentTemplate(tab.component.class);
        } else if (tab.view !== undefined) {
            if (tab.view.name === undefined) {
                throw new SchematicsException('TabView content View must define a \'name\' attribute');
            }
            const createViewArguments = {
                path: `${tabViewPath}/content/${viewCounter}`,
                viewType: tab.view.name,
                layoutParams: tab.view.params,
                // this attribute is required in the interface, but the method doesn't use it
                _routesMap: null as unknown as Map<string, Route>
            };

            result.rules.push(createView(tree, createViewArguments, false));

            const newComponentName = new ClassName(`${tabViewPath}/content/${viewCounter}`, resolveClassSuffixForView(tab.view.name));

            tabTemplate = new TabContentTemplate(newComponentName.name);
            result.tabViewImports.push(
                new ImportToAdd(newComponentName.name, createRelativePath(tabClassName.fileImportPath, newComponentName.fileImportPath))
            );
            result.entryComponentsImports.push(new ImportToAdd(newComponentName.name, newComponentName.fileImportPath));

            viewCounter++;
        } else {
            throw new SchematicsException('TabView content must contain either a \'component\' or a \'view\' attribute');
        }

        if (tab.canBeDeleted !== undefined) {
            tabTemplate.canBeDeleted = tab.canBeDeleted;
        }
        if (tab.label !== undefined) {
            tabTemplate.icon = tab.label.icon as string;
            tabTemplate.text = tab.label.text as string;
        }
        tabTemplate.order = tab.order as number;

        result.tabTemplates.push(tabTemplate);
    });

    return result;
}

function resolveClassSuffixForView(view: string): string {
    switch (view) {
        case 'login':
            return 'Login';
        case 'tabView':
            return 'TabView';
        default:
            throw new SchematicsException(`Unknown view type '${view}'`);
    }
}
