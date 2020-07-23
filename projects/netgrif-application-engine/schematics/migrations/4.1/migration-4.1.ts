import {Rule, Tree, FileEntry} from '@angular-devkit/schematics';
import {fileEntryToTsSource, forEachProjectFile} from '../../_utility/utility-functions';

export function schematicEntryPoint(): Rule {
    return (tree: Tree) => {
        forEachProjectFile(tree, (file: FileEntry) => {
            if (file.path.endsWith('.ts') && !file.path.endsWith('.spec.ts')) {
                const source = fileEntryToTsSource(file);
            }
        });
    };
}
