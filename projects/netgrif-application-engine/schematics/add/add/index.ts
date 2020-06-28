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
        rules.push(createMinimalNaeJson());
        rules.push(schematic('create-nae-files', {}));
        return chain(rules);
    };
}

function createMinimalNaeJson(): Rule {
    return (tree: Tree) => {
        if (!tree.exists('./nae.json')) {
            tree.create('./nae.json', '{\n  "extends": "nae-default",\n  "views": {\n\n  },\n  "theme":' +
                ' {\n    "name": "example-classico",\n    "pallets": {\n      "light": {\n        ' +
                '"primary": "blue"\n      }\n    }\n  }\n}');
        }
    };
}
