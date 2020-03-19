import {
    Rule,
    SchematicContext,
    SchematicsException,
    Tree,
    url,
    applyTemplates,
    apply,
    move,
    chain,
    mergeWith
} from '@angular-devkit/schematics';
import {Schema} from './schema';
import {getProjectInfo} from '../../utilityFunctions';

function handleJsonString(json: string, mainJsonobject: boolean, darkTheme: boolean) {
    if (mainJsonobject) {
        const limitSeparator = json.split('contrast')[0].split(',').length - 1;
        json = json.split(',', limitSeparator).join(',\n') + ',';
    } else {
        if (darkTheme) {
            json = json.split(',').join(':$dark-primary-text,\n');
            json = json + ':$dark-primary-text,\n';
        } else {
            json = json.split(',').join(':$light-primary-text,\n');
            json = json + ':$light-primary-text,\n';
        }
    }
    json = json.split('"').join('').split('[').join('').split('{').join('').split('}').join('').split(']').join('');
    json = json.split(':').join(' : ');
    return json;
}

export function customTemplates(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {

        const naeJson = tree.read('./nae.json');
        if (naeJson === null) {
            throw new SchematicsException('Missing \'nae.json\' file');
        }
        const data = JSON.parse(naeJson.toString());
        let correctPath = false;

        const {path} = _options;
        if (tree.exists(path) && path.includes('styles.scss')) {
            tree.overwrite(path, '@import "./styles/templates/customThemes.scss"; ' +
                '\n' + '@include mat-core();' + '\n' + tree.read(path));
            correctPath = true;
        } else if (tree.exists('./projects/' + getProjectInfo(tree).projectName + '/src/styles.scss')) {
            tree.overwrite('./projects/' + getProjectInfo(tree).projectName + '/src/styles.scss',
                '@import "./styles/templates/customThemes.scss;' + '\n' + '@include mat-core();' +
                '\n' + tree.read('./projects/' + getProjectInfo(tree).projectName + '/src/styles.scss'));
        } else {
            throw new SchematicsException('Your typed path : ' + path + ' incorrect and no file styles.scss in src folder.');
        }

        const primaryLigt = handleJsonString(JSON.stringify(data.theme.pallets.light.primary), true, false) + '\n';
        const primaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.light),
            false, false) + ' ' + handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.dark), false, true);
        const secondaryLight = handleJsonString(JSON.stringify(data.theme.pallets.light.secondary), true, false) + '\n';
        const secondaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.light),
            false, false) + ' ' + handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.dark), false, true);
        const warnLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn), true, false) + '\n';
        const warnContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.light),
            false, false) + ' ' + handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.dark), false, true);
        const primaryDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.primary), true, false);
        const primaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.light),
            false, false) + ' ' + handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.dark), false, true);
        const secondaryDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary), true, false);
        const secondaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.light),
            false, false) + ' ' + handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.dark), false, true);
        const warnDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.warn), true, false);
        const warnContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.light),
            false, false) + ' ' + handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.dark), false, true);

        const customTemplate = apply(
            url('./files'),
            [
                applyTemplates({
                    primaryLigt,
                    primaryContrastLight,
                    secondaryLight,
                    secondaryContrastLight,
                    warnLight,
                    warnContrastLight,
                    primaryDark,
                    primaryContrastDark,
                    secondaryDark,
                    secondaryContrastDark,
                    warnDark,
                    warnContrastDark
                }),
                correctPath ? move(path.replace('styles.scss', '') + '/styles/templates')
                    : move('./projects/' + getProjectInfo(tree).projectName + '/src/styles/templates')
            ]
        );

        return chain([
            mergeWith(customTemplate)
        ]);
    };
}
