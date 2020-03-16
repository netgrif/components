import {
    Rule,
    Tree,
    schematic,
    SchematicContext
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(): Rule {
    return (_: Tree, _context: SchematicContext) => {
        _context.addTask(new NodePackageInstallTask());

        // TODO help user set up nae.json if it doesn't exist

        return schematic('create-nae-files', {});
    };
}
