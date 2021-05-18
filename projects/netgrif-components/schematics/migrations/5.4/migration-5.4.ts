import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {Rule, Tree, FileEntry} from '@angular-devkit/schematics';
import {
    commitChangesToFile,
    fileEntryToTsSource,
    forEachSourceTsFile
} from '../../_utility/utility-functions';
import {findNodes} from '@schematics/angular/utility/ast-utils';
import {Change, RemoveChange} from '@schematics/angular/utility/change';


interface NodeRemoval {
    removedNode: ts.Node;
    changes: Array<Change>;
}

/**
 * Changes providers of any components that provides SearchService
 */
export function schematicEntryPoint(): Rule {
    return (tree: Tree) => {
        forEachSourceTsFile(tree, (file: FileEntry) => {
            const source = fileEntryToTsSource(file);

            const classDeclarations: Array<ts.Node> = findNodes(source, ts.SyntaxKind.ClassDeclaration);

            for (const declaration of classDeclarations) {
                if (declaration.decorators?.length !== 1) {
                    continue;
                }
                const decorator = declaration.decorators[0];
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
                    changes = migrateTaskView();
                }
                commitChangesToFile(tree, file, changes);
            }
        });
    };
}

function migrateCaseView(file: FileEntry, providersArrayContent: ts.Node[]): Array<Change> {
    const removed = removeProvider(file, providersArrayContent, 'CaseViewServiceFactory');
    if (removed === null) {
        return [];
    }
    return removed.changes;
}

function migrateTaskView(): Array<Change> {
    return [];
}

function removeProvider(file: FileEntry, providersArrayContent: ts.Node[], providerName: string): NodeRemoval | null {
    const providerIndex = providersArrayContent.findIndex(node => node.kind !== ts.SyntaxKind.CommaToken
        && (
            (node.kind === ts.SyntaxKind.Identifier && node.getText() === providerName)
            || (node.kind === ts.SyntaxKind.ObjectLiteralExpression && node.getChildAt(1).getChildren().some(complexProviderNode =>
                complexProviderNode.kind === ts.SyntaxKind.PropertyAssignment
                && complexProviderNode.getChildAt(0).getText() === 'provide'
                && complexProviderNode.getChildAt(2).getText() === providerName
            ))
        ));

    if (providerIndex === -1) {
        return null;
    }

    const providerNode = providersArrayContent[providerIndex];

    let textToDelete = providerNode.getText();
    if (providersArrayContent.length - 1 > providerIndex) {
        textToDelete += providersArrayContent[providerIndex + 1].getText();
    }

    const changes = [new RemoveChange(file.path, providerNode.pos, textToDelete)];

    return {
        removedNode: providerNode,
        changes
    };
}
