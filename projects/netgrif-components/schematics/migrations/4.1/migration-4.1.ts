import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {Rule, Tree, FileEntry} from '@angular-devkit/schematics';
import {
    addProviderToComponent,
    commitChangesToFile,
    fileEntryToTsSource,
    findNodesInChildren,
    forEachProjectFile
} from '../../_utility/utility-functions';
import {findNodes} from '@schematics/angular/utility/ast-utils';

/**
 * Adds a new provider to all subclasses of CaseView in the project
 */
export function schematicEntryPoint(): Rule {
    return (tree: Tree) => {
        forEachProjectFile(tree, (file: FileEntry) => {
            if (file.path.endsWith('.ts') && !file.path.endsWith('.spec.ts')) {
                const source = fileEntryToTsSource(file);

                const extendsKeywords: ts.Node[] = findNodes(source, ts.SyntaxKind.ExtendsKeyword);
                if (extendsKeywords === null || extendsKeywords.length === 0) {
                    return; // continue
                }
                let extendsCaseView = false;
                for (const node of extendsKeywords) {
                    const identifiers = findNodesInChildren(node.parent, ts.SyntaxKind.Identifier, true);
                    if (identifiers.some(identifier =>
                            identifier.getText() === 'AbstractCaseView'
                            || identifier.getText() === 'TabbedCaseView')
                    ) {
                        extendsCaseView = true;
                        break;
                    }
                }

                if (extendsCaseView) {
                    const changes = addProviderToComponent(file, 'SearchChipService', '@netgrif/components-core', undefined);
                    commitChangesToFile(tree, file, changes);
                }
            }
        });
    };
}
