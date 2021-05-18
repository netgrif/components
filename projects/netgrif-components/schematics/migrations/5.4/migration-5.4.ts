import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {Rule, Tree, FileEntry} from '@angular-devkit/schematics';
import {
    fileEntryToTsSource,
    forEachSourceTsFile
} from '../../_utility/utility-functions';
import {findNodes} from '@schematics/angular/utility/ast-utils';

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

                if (viewServiceFactoryProvider.getText() === 'CaseViewServiceFactory') {
                    migrateCaseView();
                } else {
                    migrateTaskView();
                }
            }
        });
    };
}

function migrateCaseView(): void {

}

function migrateTaskView(): void {

}
