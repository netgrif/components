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
        let secondaryLight = returnPaletteIfExistOrCreate(data.theme.pallets.light.secondary, false);
        let secondaryContrastLight = null;
        if (secondaryLight.length === 0) {
            if (typeof data.theme.pallets.light.primary === 'string') {
                const palette = PaletteGenerator.default.getSimilar(data.theme.pallets.light.primary);
                secondaryLight = returnPaletteIfExistOrCreate(palette.complementary.hex, false);
            } else {
                throw new SchematicsException('Secondary color required');
            }
        } else {
            secondaryContrastLight = returnContrastIfExist(data.theme.pallets.light.secondary.contrast);
        }
        let warnLight = returnPaletteIfExistOrCreate(data.theme.pallets.light.warn, false);
        let warnContrastLight = null;
        if (warnLight.length === 0) {
            warnLight = returnPaletteIfExistOrCreate('#FF5722', false);
        } else {
            warnContrastLight = returnContrastIfExist(data.theme.pallets.light.warn.contrast);
        }
        if (darkExists) {
            primaryDark = returnPaletteIfExistOrCreate(data.theme.pallets.dark.primary, true);
            primaryContrastDark = (primaryDark) ? returnContrastIfExist(data.theme.pallets.dark.primary.contrast) : null;
            secondaryDark = returnPaletteIfExistOrCreate(data.theme.pallets.dark.secondary, true);
            if (secondaryDark.length === 0) {
                if (typeof data.theme.pallets.dark.primary === 'string') {
                    const palette = PaletteGenerator.default.getSimilar(data.theme.pallets.dark.primary);
                    secondaryDark = returnPaletteIfExistOrCreate(palette.complementary.hex, false);
                } else {
                    throw new SchematicsException('Secondary dark color required');
                }
            } else {
                secondaryContrastDark = returnContrastIfExist(data.theme.pallets.dark.secondary.contrast);
            }
            warnDark = returnPaletteIfExistOrCreate(data.theme.pallets.dark.warn, true);
            if (warnDark.length === 0) {
                warnDark = returnPaletteIfExistOrCreate('#FF5722', false);
            } else {
                warnContrastDark = returnContrastIfExist(data.theme.pallets.dark.warn.contrast);
            }
        }

        const rules = [];
        const pathTomove = path + '/../styles/themes';
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
            darkExists,
            primaryLight,
            secondaryLight,
            warnLight,
            primaryDark,
            secondaryDark,
            warnDark,
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
            if (wholeStyleContent.toString().match('./styles/themes/custom-themes.scss') === null) {
                importsAndIncludes += '@import \'./styles/themes/custom-themes.scss\';' + '\n';
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
    if (tree.exists(pathTomove + '/custom-dark-theme.scss')) {
        tree.delete(pathTomove + '/custom-dark-theme.scss');
    }
    if (tree.exists(pathTomove + '/custom-light-theme.scss')) {
        tree.delete(pathTomove + '/custom-light-theme.scss');
    }
}

