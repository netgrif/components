import {chain, Rule, SchematicsException, Tree} from '@angular-devkit/schematics';
import {
    createFilesFromTemplates,
    createRelativePath,
    getProjectInfo
} from '../../../../_utility/utility-functions';
import {EmbeddedView, TabViewParams} from '../../models/params-interfaces';
import {strings} from '@angular-devkit/core';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {TabContentTemplate} from '../../models/tab-content-template';
import {ImportToAdd} from '../../../../_commons/import-to-add';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {CreateViewArguments} from '../../models/create-view-arguments';


interface TabViews {
    'rules': Array<Rule>;
    'tabTemplates': Array<TabContentTemplate>;
    'tabViewImports': Array<ImportToAdd>;
    'entryComponentsImports': Array<ImportToAdd>;
}

export function createTabView(
    tree: Tree,
    args: CreateViewArguments,
    addViewToService: boolean,
    createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addViewToService?: boolean) => Rule
): Rule {

    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(
        args.path,
        'tabView',
        args.componentName
    );
    const params = args.layoutParams as TabViewParams;

    const tabViews = newTabViews();
    let viewCounterStart = 0;

    if (!!params.defaultTaskView) {
        processEmbeddedView(params.defaultTaskView, tabViews, view, args.path,
            viewCounterStart, tree, createViewFunctionRef, true);
        viewCounterStart++;
    }

    pushTabViews(tabViews, processTabViewContents(
        tree,
        params,
        args.path,
        view,
        createViewFunctionRef,
        viewCounterStart
    ));

    if (!!params.defaultTaskView) {
        for (let i = 1; i < tabViews.tabTemplates.length; i++) {
            if (tabViews.tabViewImports[i].className.endsWith('CaseViewComponent')) {
                const injectedData = {} as any;
                injectedData.tabViewComponent = tabViews.tabViewImports[0].className;
                injectedData.tabViewOrder = params.defaultTaskView.order ? params.defaultTaskView.order : 0;
                tabViews.tabTemplates[i].injectedObject = injectedData;
            }
        }
        // we don't want to generate the default tab view as a tab
        tabViews.tabTemplates.splice(0, 1);
    }

    const rules = tabViews.rules;

    rules.push(createFilesFromTemplates('./views/tab-view/files', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        tabs: tabViews.tabTemplates,
        imports: tabViews.tabViewImports,
        dasherize: strings.dasherize,
        classify: strings.classify,
        modulePath: createRelativePath(view.fileImportPath, './app.module'),
        viewIdSegment: getViewIdSegmentFromPath(args.path)
    }));

    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('TabsComponentModule', '@netgrif/components')]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}

function processTabViewContents(tree: Tree,
                                tabViewParams: TabViewParams,
                                hostViewPath: string,
                                hostClassName: ViewClassInfo,
                                createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule,
                                viewCounterStartValue = 0
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
                             hostClassName: ViewClassInfo,
                             hostViewPath: string,
                             viewNumber: number,
                             tree: Tree,
                             createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule,
                             isDefaultTabbedTaskView = false
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
            createViewFunctionRef,
            isDefaultTabbedTaskView);
    } else {
        throw new SchematicsException('TabView content must contain either a \'component\' or a \'view\' attribute');
    }
    if (embeddedView.canBeClosed !== undefined) {
        tabTemplate.canBeDeleted = embeddedView.canBeClosed;
    } else {
        tabTemplate.canBeDeleted = false;
    }
    if (embeddedView.label !== undefined) {
        if (embeddedView.label.icon !== undefined) {
            tabTemplate.icon = embeddedView.label.icon;
        }
        if (embeddedView.label.text !== undefined) {
            tabTemplate.text = embeddedView.label.text;
        }
    }
    if (embeddedView.order !== undefined) {
        tabTemplate.order = embeddedView.order;
    }

    result.tabTemplates.push(tabTemplate);
}

function processEmbeddedComponent(embeddedComponent: EmbeddedView, result: TabViews, hostClassName: ViewClassInfo): TabContentTemplate {
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
                                hostClassName: ViewClassInfo,
                                newViewPath: string,
                                tree: Tree,
                                createViewFunctionRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule,
                                isDefaultTabbedTaskView = false
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
        componentName: embeddedView.view.componentName,
        isTabbed: true,
        access: 'private' as 'private',
        isDefaultTabbedTaskView,
        enableCaseTitle: embeddedView.enableCaseTitle === undefined ? true : embeddedView.enableCaseTitle,
        isCaseTitleRequired: embeddedView.isCaseTitleRequired === undefined ? true : embeddedView.isCaseTitleRequired
    };

    result.rules.push(createViewFunctionRef(tree, createViewArguments, false));

    const newComponentName = new ViewClassInfo(newViewPath, embeddedView.view.name);

    result.tabViewImports.push(
        new ImportToAdd(newComponentName.className, createRelativePath(hostClassName.fileImportPath, newComponentName.fileImportPath))
    );
    result.entryComponentsImports.push(new ImportToAdd(newComponentName.className, newComponentName.fileImportPath));

    return new TabContentTemplate(newComponentName.className);
}

function pushTabViews(destination: TabViews, source: TabViews): TabViews {
    // iteration over Object.keys() caused a type compilation error
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
