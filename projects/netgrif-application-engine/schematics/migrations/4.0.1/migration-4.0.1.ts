import {Rule, schematic} from '@angular-devkit/schematics';

export function schematicEntryPoint(): Rule {
    return () => {
        return schematic('update-package-json', {});
    };
}
