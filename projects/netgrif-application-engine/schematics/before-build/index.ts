import {
    chain,
    Rule,
    schematic
} from '@angular-devkit/schematics';

export function beforeBuild(): Rule {
    return () => {
        return chain([
            schematic('populate-configuration-service', {}),
        ]);
    };
}
