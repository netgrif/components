import {Rule, SchematicsException, Tree} from '@angular-devkit/schematics';

export function schematicEntryPoint(): Rule  {
    return (tree: Tree) => {
        const content = tree.read('/package.json');
        if (!content) {
            throw new SchematicsException('Missing file \'package.json\'.');
        }
        const packageJson = JSON.parse(content.toString());
        packageJson.scripts.build = 'env NG_BUILD_MANGLE=false NG_BUILD_MINIFY=true NG_BUILD_BEAUTIFY=true ng build --prod';
        tree.overwrite('package.json', JSON.stringify(packageJson, null, 4));
    };
}
