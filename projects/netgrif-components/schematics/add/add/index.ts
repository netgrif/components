import {
    Rule,
    Tree,
    schematic,
    SchematicContext,
    chain
} from '@angular-devkit/schematics';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';

export function ngAdd(): Rule {
    return (_: Tree, _context: SchematicContext) => {
        _context.addTask(new NodePackageInstallTask());

        // TODO help user set up nae.json if it doesn't exist

        const rules = [];
        rules.push(schematic('create-nc-files', {}));
        return chain(rules);
    };
}
