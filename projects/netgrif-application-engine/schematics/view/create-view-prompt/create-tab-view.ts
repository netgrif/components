import {chain, Rule, SchematicsException, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {commitChangesToFile, createFilesFromTemplates, createRelativePath, getAppModule, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {EmbeddedView, TabViewParams} from './classes/paramsInterfaces';
import {strings} from '@angular-devkit/core';
import {
    addAuthGuardImport,
    addRouteToRoutesJson,
    addRoutingModuleImport,
    resolveClassSuffixForView,
    updateAppModule
} from '../view-utility-functions';
import {ImportToAdd} from './classes/ImportToAdd';
import {addEntryComponentToModule} from '@schematics/angular/utility/ast-utils';
import {TabContentTemplate} from './classes/TabContentTemplate';


interface TabViews {
    'rules': Array<Rule>;
    'tabTemplates': Array<TabContentTemplate>;
    'tabViewImports': Array<ImportToAdd>;
    'entryComponentsImports': Array<ImportToAdd>;
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

    const tabViews = newTabViews();
    let viewCounterStart = 0;

    if (!!params.defaultTaskView) {
        processEmbeddedView(params.defaultTaskView, tabViews, className, args.path as string,
                            viewCounterStart, tree, createViewFunctionRef);
        viewCounterStart++;
    }

    pushTabViews(tabViews, processTabViewContents(
        tree,
        params,
        args.path as string,
        className,
        createViewFunctionRef,
        viewCounterStart
    ));

    if (!!params.defaultTaskView) {
        for (let i = 1; i < tabViews.tabTemplates.length; i++) {
            if (tabViews.tabViewImports[i].className.endsWith('CaseViewComponent')) {
                const injectedData = {} as any;
                injectedData.tabViewComponent = tabViews.tabViewImports[0].className;
                injectedData.tabViewOrder = params.defaultTaskView.order;
                tabViews.tabTemplates[i].injectedObject = injectedData;
            }
        }
        // we don't want to generate the default tab view as a tab
        tabViews.tabTemplates.splice(0, 1);
    }

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
        rules.push(addRouteToRoutesJson(args.path as string, className.name, args.access));
        rules.push(addRouteToRoutesJson(`${args.path}/**`, className.name, args.access));
        addAuthGuardImport(tree, args.access);
    }
    return chain(rules);
}

function processTabViewContents(
    tree: Tree,
    tabViewParams: TabViewParams,
    hostViewPath: string,
    hostClassName: ClassName,
    createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule,
    viewCounterStartValue: number = 0
): TabViews {

    const result = newTabViews();

    if (tabViewParams.tabs === undefined) {
        return result;
    }

    let viewCounter = viewCounterStartValue;
    tabViewParams.tabs.forEach(tab => {
        processEmbeddedView(tab, result, hostClassName, hostViewPath, viewCounter, tree, createViewFunctionRef);
        viewCounter++;
    });

    return result;
}

function processEmbeddedView(embeddedView: EmbeddedView,
                             result: TabViews,
                             hostClassName: ClassName,
                             hostViewPath: string,
                             viewNumber: number,
                             tree: Tree,
                             createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule
): void {
    let tabTemplate: TabContentTemplate;
    if (embeddedView.component !== undefined) {
        tabTemplate = processEmbeddedComponent(embeddedView, result, hostClassName);
    } else if (embeddedView.view !== undefined) {
        tabTemplate = processEmbeddedNewView(embeddedView,
                                             result,
                                             hostClassName,
                                             `${hostViewPath}/content/${viewNumber}`,
                                             tree,
                                             createViewFunctionRef);
    } else {
        throw new SchematicsException('TabView content must contain either a \'component\' or a \'view\' attribute');
    }

    if (embeddedView.canBeClosed !== undefined) {
        tabTemplate.canBeDeleted = embeddedView.canBeClosed;
    }
    if (embeddedView.label !== undefined) {
        tabTemplate.icon = embeddedView.label.icon as string;
        tabTemplate.text = embeddedView.label.text as string;
    }
    tabTemplate.order = embeddedView.order as number;

    result.tabTemplates.push(tabTemplate);
}

function processEmbeddedComponent(embeddedComponent: EmbeddedView, result: TabViews, hostClassName: ClassName): TabContentTemplate {
    if (!embeddedComponent.component) {
        throw new SchematicsException('processEmbeddedComponent can\'t be called with EmbeddedView object' +
            ' that doesn\'t contain the \'component\' attribute!');
    }

    if (embeddedComponent.component.class === undefined || embeddedComponent.component.classPath === undefined) {
        throw new SchematicsException('TabView content Component must define both a \'class\' and a \'classPath\' attribute');
    }

    if (!embeddedComponent.component.classPath.startsWith('./')) {
        embeddedComponent.component.classPath = `./${embeddedComponent.component.classPath}`;
    }

    result.tabViewImports.push(new ImportToAdd(embeddedComponent.component.class,
                                               createRelativePath(hostClassName.fileImportPath, embeddedComponent.component.classPath))
    );
    result.entryComponentsImports.push(new ImportToAdd(embeddedComponent.component.class, embeddedComponent.component.classPath));

    return new TabContentTemplate(embeddedComponent.component.class);
}

function processEmbeddedNewView(embeddedView: EmbeddedView,
                                result: TabViews,
                                hostClassName: ClassName,
                                newViewPath: string,
                                tree: Tree,
                                createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule
): TabContentTemplate {
    if (!embeddedView.view) {
        throw new SchematicsException('processEmbeddedNewView can\'t be called with EmbeddedView object' +
            ' that doesn\'t contain the \'view\' attribute!');
    }

    if (embeddedView.view.name === undefined) {
        throw new SchematicsException('TabView content View must define a \'name\' attribute');
    }

    const createViewArguments = {
        path: newViewPath,
        viewType: embeddedView.view.name,
        layoutParams: embeddedView.view.params,
        isTabbed: true
    };

    result.rules.push(createViewFunctionRef(tree, createViewArguments, false));

    const newComponentName = new ClassName(newViewPath, resolveClassSuffixForView(embeddedView.view.name));

    result.tabViewImports.push(
        new ImportToAdd(newComponentName.name, createRelativePath(hostClassName.fileImportPath, newComponentName.fileImportPath))
    );
    result.entryComponentsImports.push(new ImportToAdd(newComponentName.name, newComponentName.fileImportPath));

    return new TabContentTemplate(newComponentName.name);
}

function pushTabViews(destination: TabViews, source: TabViews): TabViews {
    // iteration trough Object.keys() caused a type compilation error
    destination.entryComponentsImports.push(...source.entryComponentsImports);
    destination.tabViewImports.push(...source.tabViewImports);
    destination.tabTemplates.push(...source.tabTemplates);
    destination.rules.push(...source.rules);
    return destination;
}

function newTabViews(): TabViews {
    return {
        rules: [],
        tabTemplates: [],
        tabViewImports: [],
        entryComponentsImports: []
    };
}
