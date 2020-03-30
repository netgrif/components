import {chain, Rule, SchematicsException, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {commitChangesToFile, createFilesFromTemplates, createRelativePath, getAppModule, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {TabViewParams} from './classes/paramsInterfaces';
import {strings} from '@angular-devkit/core';
import {addRouteToRoutesJson, addRoutingModuleImport, Route, updateAppModule} from '../view-utility-functions';
import {ImportToAdd} from './classes/ImportToAdd';
import {addEntryComponentToModule} from '@schematics/angular/utility/ast-utils';
import {TabContentTemplate} from './classes/TabContentTemplate';


interface TabViews {
    rules: Array<Rule>;
    tabTemplates: Array<TabContentTemplate>;
    tabViewImports: Array<ImportToAdd>;
    entryComponentsImports: Array<ImportToAdd>;
}

export function createTabView(
    tree: Tree,
    args: CreateViewArguments,
    addRoute: boolean,
    createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule
): Rule {

    const projectInfo = getProjectInfo(tree);
    const className = new ClassName(args.path as string, 'TabView');
    const params = args.layoutParams as TabViewParams;
    const injectedData: any = undefined;

    const tabViews: TabViews = {
        rules: [],
        tabTemplates: [],
        tabViewImports: [],
        entryComponentsImports: [],
    };

    if (params.defaultTaskView) {
        pushTabViews(tabViews, processTabViewContents(
            tree,
            params,
            args.path as string,
            className,
            createViewFunctionRef
        ));


    }

    pushTabViews(tabViews, processTabViewContents(
        tree,
        params,
        args.path as string,
        className,
        createViewFunctionRef
    ));

    const rules = tabViews.rules;

    rules.push(createFilesFromTemplates('./files/tab-view', `${projectInfo.path}/views/${args.path}`, {
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
        rules.push(addRouteToRoutesJson(args.path as string, className.name));
        rules.push(addRouteToRoutesJson(`${args.path}/**`, className.name));
    }
    return chain(rules);
}

function processTabViewContents(
    tree: Tree,
    tabViewParams: TabViewParams,
    tabViewPath: string,
    tabClassName: ClassName,
    createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule
): TabViews {

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

            if (!tab.component.classPath.startsWith('./')) {
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

            result.rules.push(createViewFunctionRef(tree, createViewArguments, false));

            const newComponentName = new ClassName(`${tabViewPath}/content/${viewCounter}`, 'TabView');

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

function pushTabViews(destination: TabViews, source: TabViews): TabViews {
    for (const attribute of Object.keys(destination) ) {
        (destination[attribute] as Array<any>).push(...(source[attribute] as Array<any>));
    }
    return destination;
}
