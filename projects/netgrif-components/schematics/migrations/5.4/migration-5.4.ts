import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {Rule, Tree, FileEntry} from '@angular-devkit/schematics';
import {
    addImport,
    addProviderToComponent,
    commitChangesToFile,
    fileEntryToTsSource,
    forEachSourceTsFile
} from '../../_utility/utility-functions';
import {findNodes} from '@schematics/angular/utility/ast-utils';
import {Change, NoopChange, RemoveChange} from '@schematics/angular/utility/change';
import {ImportToAdd} from '../../_commons/import-to-add';


/**
 * Changes providers of any components that provides SearchService
 */
export function schematicEntryPoint(): Rule {
    return (tree: Tree) => {
        forEachSourceTsFile(tree, (file: FileEntry) => {
            const source = fileEntryToTsSource(file);

            const classDeclarations: Array<ts.Node> = findNodes(source, ts.SyntaxKind.ClassDeclaration);

            for (const declaration of classDeclarations) {
                if (!ts.canHaveDecorators(declaration)) {
                    continue
                }
                if (ts.getDecorators(declaration)?.length !== 1) {
                    continue;
                }
                const decorators = ts.getDecorators(declaration);
                const decorator = decorators !== undefined ? decorators[0] : undefined;
                if (decorator?.expression?.getFirstToken()?.getText() !== 'Component') {
                    continue;
                }
                const decoratorEntries = decorator?.expression?.getChildAt(2)?.getChildAt(0)?.getChildAt(1)?.getChildren();
                if (decoratorEntries === undefined) {
                    continue;
                }

                const providers = decoratorEntries.find(entry => entry.kind === ts.SyntaxKind.PropertyAssignment
                    && (entry as ts.Identifier).getChildAt(0)?.getText() === 'providers');

                if (providers === undefined) {
                    continue;
                }

                const providersArrayContent = providers.getChildAt(2).getChildAt(1).getChildren();

                const viewServiceFactoryProvider = providersArrayContent.find(node => node.kind === ts.SyntaxKind.Identifier
                    && (node.getText() === 'CaseViewServiceFactory' || node.getText() === 'TaskViewServiceFactory'));

                if (viewServiceFactoryProvider === undefined) {
                    continue;
                }

                let changes;
                if (viewServiceFactoryProvider.getText() === 'CaseViewServiceFactory') {
                    changes = migrateCaseView(file, providersArrayContent);
                } else {
                    changes = migrateTaskView(file, providersArrayContent);
                }
                commitChangesToFile(tree, file, changes);
            }
        });
    };
}

function migrateCaseView(file: FileEntry, providersArrayContent: ts.Node[]): Array<Change> {
    const searchServiceAlias = findProviderAlias(providersArrayContent, 'SearchService');

    if (searchServiceAlias === null) {
        return [];
    }

    const changes = addProviderToComponent(file, 'CaseViewService', '@netgrif/components-core');
    changes.push(...addProviderToComponent(file, searchServiceAlias,
        searchServiceAlias === 'SearchService' ? '@netgrif/components-core' : undefined));
    changes.push(...addProviderToComponent(file, 'NAE_BASE_FILTER', '@netgrif/components-core',
        '{provide: NAE_BASE_FILTER, useFactory: baseFilterFactory}'));
    changes.push(...addProviderToComponent(file, 'AllowedNetsService', '@netgrif/components-core',
        '{provide: AllowedNetsService, useFactory: localAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}'));
    changes.push(addImport(file, new ImportToAdd('AllowedNetsServiceFactory', '@netgrif/components-core')));

    changes.push(removeProvider(file, providersArrayContent, 'CaseViewServiceFactory'));
    changes.push(removeProvider(file, providersArrayContent, searchServiceAlias));
    changes.push(removeProvider(file, providersArrayContent, 'CaseViewService'));

    return changes;
}

function migrateTaskView(file: FileEntry, providersArrayContent: ts.Node[]): Array<Change> {
    const searchServiceAlias = findProviderAlias(providersArrayContent, 'SearchService');

    if (searchServiceAlias === null) {
        return [];
    }

    const changes = addProviderToComponent(file, 'TaskViewService', '@netgrif/components-core');
    changes.push(...addProviderToComponent(file, searchServiceAlias,
        searchServiceAlias === 'SearchService' ? '@netgrif/components-core' : undefined));
    changes.push(...addProviderToComponent(file, 'NAE_BASE_FILTER', '@netgrif/components-core',
        '{provide: NAE_BASE_FILTER, useFactory: baseFilterFactory}'));
    changes.push(addImport(file, new ImportToAdd('AllowedNetsServiceFactory', '@netgrif/components-core')));

    changes.push(removeProvider(file, providersArrayContent, 'TaskViewServiceFactory'));
    changes.push(removeProvider(file, providersArrayContent, searchServiceAlias));
    changes.push(removeProvider(file, providersArrayContent, 'TaskViewService'));

    const source = fileEntryToTsSource(file);
    const identifiers = findNodes(source, ts.SyntaxKind.Identifier);

    if (identifiers.some(identifier => identifier.getText() === 'NAE_TAB_DATA')) {
        // tabbed task view
        changes.push(...addProviderToComponent(file, 'AllowedNetsService', '@netgrif/components-core',
            '{provide: AllowedNetsService, useFactory: tabbedAllowedNetsServiceFactory, deps: [AllowedNetsServiceFactory, NAE_TAB_DATA]}'));
        changes.push(addImport(file, new ImportToAdd('tabbedAllowedNetsServiceFactory', '@netgrif/components-core')));
        changes.push(...addProviderToComponent(file, 'NAE_TASK_VIEW_CONFIGURATION', '@netgrif/components-core',
            '{provide: NAE_TASK_VIEW_CONFIGURATION, useFactory: tabbedTaskViewConfigurationFactory, deps: [NAE_TAB_DATA]}'));
        changes.push(addImport(file, new ImportToAdd('tabbedTaskViewConfigurationFactory', '@netgrif/components-core')));
    } else {
        // standard task view
        changes.push(...addProviderToComponent(file, 'AllowedNetsService', '@netgrif/components-core',
            '{provide: AllowedNetsService, useFactory: localAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}'));
    }

    return changes;
}

function removeProvider(file: FileEntry, providersArrayContent: ts.Node[], providerName: string): Change {
    const index = findProviderIndex(providersArrayContent, providerName);
    if (index === -1) {
        return new NoopChange();
    }
    const providerNode = providersArrayContent[index];

    let textToRemove = providerNode.getFullText();
    if (index !== providersArrayContent.length - 1) {
        textToRemove += providersArrayContent[index + 1].getFullText();
    }
    return new RemoveChange(file.path, providerNode.pos, textToRemove);
}

function findProviderAlias(providersArrayContent: ts.Node[], providerName: string): string | null {
    const providerIndex = findProviderIndex(providersArrayContent, providerName);

    if (providerIndex === -1) {
        return null;
    }

    const providerNode = providersArrayContent[providerIndex];

    if (providerNode.kind === ts.SyntaxKind.Identifier) {
        return providerName;
    }

    const useExistingNode = providerNode.getChildAt(1).getChildren().find(complexProviderNode =>
        complexProviderNode.kind === ts.SyntaxKind.PropertyAssignment
        && complexProviderNode.getChildAt(0).getText() === 'useExisting');

    if (useExistingNode === undefined) {
        return providerName;
    }

    return useExistingNode.getChildAt(2).getText();
}

function findProviderIndex(providersArrayContent: ts.Node[], providerName: string): number {
    return providersArrayContent.findIndex(node => node.kind !== ts.SyntaxKind.CommaToken
        && (
            (node.kind === ts.SyntaxKind.Identifier && node.getText() === providerName)
            || (node.kind === ts.SyntaxKind.ObjectLiteralExpression && node.getChildAt(1).getChildren().some(complexProviderNode =>
                complexProviderNode.kind === ts.SyntaxKind.PropertyAssignment
                && complexProviderNode.getChildAt(0).getText() === 'provide'
                && complexProviderNode.getChildAt(2).getText() === providerName
            ))
        ));
}
