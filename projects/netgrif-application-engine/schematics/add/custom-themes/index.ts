import {
    Rule,
    SchematicsException,
    Tree,
    chain,
} from '@angular-devkit/schematics';
import {createFilesFromTemplates, getProjectInfo} from '../../_utility/utility-functions';
// Javascript libka, ktoru typescript nechcel skompilovat. Problem ja internete vyrieseny takto a aj samotne readme obsahuje tento sposob.
const PaletteGenerator = require('palette-creator');

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

export function customThemes(): Rule {
    return (tree: Tree) => {
        const path = getProjectInfo(tree).path;

        const naeJson = tree.read('./nae.json');
        if (naeJson === null) {
            throw new SchematicsException('Missing \'nae.json\' file');
        }
        const data = JSON.parse(naeJson.toString());
        if (!tree.exists(path + '/../styles.scss')) {
            throw new SchematicsException('Cant find styles.scss file');
        }
        let darkExists = false;
        if (data.theme.pallets.dark !== undefined && data.theme.pallets.dark.primary !== undefined) {
            darkExists = true;
        }
        if (data.theme.pallets.light.primary === undefined) {
            throw new SchematicsException('Light theme must be specified !');
        }
        let primaryDark: string | null = '';
        let primaryContrastDark: string | null = '';
        let secondaryDark: string | null = '';
        let secondaryContrastDark: string | null = '';
        let warnDark: string | null = '';
        let warnContrastDark: string | null = '';
        const primaryLight = returnPaletteIfExistOrCreate(data.theme.pallets.light.primary, false);
        const primaryContrastLight = (primaryLight) ? returnContrastIfExist(data.theme.pallets.light.primary.contrast) : null;
        const secondaryLight = returnPaletteIfExistOrCreate(data.theme.pallets.light.secondary, false);
        const secondaryContrastLight = (secondaryLight) ? returnContrastIfExist(data.theme.pallets.light.secondary.contrast) : null;
        const warnLight = returnPaletteIfExistOrCreate(data.theme.pallets.light.warn, false);
        const warnContrastLight = (warnLight) ? returnContrastIfExist(data.theme.pallets.light.warn.contrast) : null;
        if (darkExists) {
            primaryDark = returnPaletteIfExistOrCreate(data.theme.pallets.dark.primary, true);
            primaryContrastDark = (primaryDark) ? returnContrastIfExist(data.theme.pallets.dark.primary.contrast) : null;
            secondaryDark = returnPaletteIfExistOrCreate(data.theme.pallets.dark.secondary, true);
            secondaryContrastDark = (secondaryDark) ? returnContrastIfExist(data.theme.pallets.dark.secondary.contrast) : null;
            warnDark = returnPaletteIfExistOrCreate(data.theme.pallets.dark.warn, true);
            warnContrastDark = (warnDark) ? returnContrastIfExist(data.theme.pallets.dark.warn.contrast) : null;
        }

        const rules = [];
        const pathTomove = path + '/../styles/templates';
        rules.push(createFilesFromTemplates('./files/light-theme', pathTomove, {
            primaryLight,
            primaryContrastLight,
            secondaryLight,
            secondaryContrastLight,
            warnLight,
            warnContrastLight
        }));

        if (darkExists) {
            rules.push(createFilesFromTemplates('./files/dark-theme', pathTomove, {
                primaryDark,
                primaryContrastDark,
                secondaryDark,
                secondaryContrastDark,
                warnDark,
                warnContrastDark
            }));

        }
        rules.push(createFilesFromTemplates('./files/custom-themes', pathTomove, {
            darkExists
        }));

        deleteExistingFiles(tree, pathTomove);
        const wholeStyleContent = tree.read(path + '/../styles.scss');
        if (wholeStyleContent) {
            let importsAndIncludes = '';
            if (!wholeStyleContent.toString().match('~@angular/material/theming')) {
                importsAndIncludes += '@import \'~@angular/material/theming\';\n';
            }
            if (wholeStyleContent.toString().match('@include mat-core()') === null) {
                importsAndIncludes += '@include mat-core();' + '\n';
            }
            if (wholeStyleContent.toString().match('./styles/templates/custom-themes.scss') === null) {
                importsAndIncludes += '@import \'./styles/templates/custom-themes.scss\';' + '\n';
            }
            tree.overwrite(path + '/../styles.scss',
                importsAndIncludes + tree.read(path + '/../styles.scss'));
        }
        return chain(rules);
    };
}

function generatePalette(hexColor: string): string {
    let stringToReturn = '';
    const palette = PaletteGenerator.default.getPalette(hexColor);
    let paletteKeys: number[];
    paletteKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800];
    paletteKeys.forEach(value => stringToReturn += (value + ': ' + palette[value].hex + ',\n'));
    return stringToReturn + '900 : ' + palette[900].hex + ',';
}

function returnPaletteIfExistOrCreate(dataTocheck: any, darkTheme: boolean) {
    if (dataTocheck instanceof Object) {
        return handleJsonString(JSON.stringify(dataTocheck), true, darkTheme);
    } else if (typeof dataTocheck === 'string') {
        return generatePalette(dataTocheck);
    }
    return '';
}

function returnContrastIfExist(dataTocheck: any) {
    let contrastToReturn = '';
    if (dataTocheck instanceof Object) {
        if (dataTocheck.light !== undefined) {
            contrastToReturn += handleJsonString(JSON.stringify(dataTocheck.light), false, false) + ' ';
        }
        if (dataTocheck.dark !== undefined) {
            contrastToReturn += handleJsonString(JSON.stringify(dataTocheck.dark), false, true);
        }
    } else {
        contrastToReturn += '50 :$light-primary-text,' +
            ' \n 100 :$light-primary-text,' +
            ' \n 200 :$light-primary-text,' +
            ' \n 300 :$light-primary-text,' +
            ' \n400 :$light-primary-text, ' +
            '\n 500 :$light-primary-text,' +
            ' \n 600 :$dark-primary-text,' +
            ' \n 700 :$dark-primary-text,' +
            ' \n 800 :$dark-primary-text,' +
            ' \n900 :$dark-primary-text';
    }
    return contrastToReturn;
}

function deleteExistingFiles(tree: Tree, pathTomove: string) {
    if (tree.exists(pathTomove + '/custom-themes.scss')) {
        tree.delete(pathTomove + '/custom-themes.scss');
    }
    if (tree.exists(pathTomove + '/custom-dark-template.scss')) {
        tree.delete(pathTomove + '/custom-dark-template.scss');
    }
    if (tree.exists(pathTomove + '/custom-light-template.scss')) {
        tree.delete(pathTomove + '/custom-light-template.scss');
    }
}

