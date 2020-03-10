import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    Tree,
    url,
    SchematicsException
} from '@angular-devkit/schematics';
import {getProjectInfo} from "../../utilityFunctions";

export function customTemplates(): Rule {
    return (tree: Tree) => {

        let lastIndex = getProjectInfo(tree).path.lastIndexOf("/");
        let path = getProjectInfo(tree).path.substring(0, lastIndex) + "/styles.scss";
        let data = JSON.parse(tree.read("./nae.json")!.toString());
        if (tree.exists(path)) {
            tree.overwrite(path, "@import \"./styles/templates/customThemes.scss\"; " + '\n' + "@include mat-core();" + '\n' + tree.read(path));
        } else {
            throw new SchematicsException('Your typed path : ' + path + ' incorrect and no file styles.scss in src folder.');
        }

        let primaryLigt = handleJsonString(JSON.stringify(data.theme.pallets.light.primary), true, false) + '\n';
        let primaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.dark), false, true);
        let secondaryLight = handleJsonString(JSON.stringify(data.theme.pallets.light.secondary), true, false) + '\n';
        let secondaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.dark), false, true);
        let warnLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn), true, false) + '\n';
        let warnContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.dark), false, true);
        let primaryDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.primary), true, false);
        let primaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.dark), false, true);
        let secondaryDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary), true, false);
        let secondaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.dark), false, true);
        let warnDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.warn), true, false);
        let warnContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.dark), false, true);

        const customTemplates = apply(
            url('./files'),
            [
                applyTemplates({
                    primaryLigt: primaryLigt,
                    primaryContrastLight: primaryContrastLight,
                    secondaryLight: secondaryLight,
                    secondaryContrastLight: secondaryContrastLight,
                    warnLight: warnLight,
                    warnContrastLight: warnContrastLight,
                    primaryDark: primaryDark,
                    primaryContrastDark: primaryContrastDark,
                    secondaryDark: secondaryDark,
                    secondaryContrastDark: secondaryContrastDark,
                    warnDark: warnDark,
                    warnContrastDark: warnContrastDark
                }),
             move(path.replace('styles.scss', '') + "/styles/templates")
            ]
        );

        return chain([
            mergeWith(customTemplates)
        ]);
    }
}
function handleJsonString(json: string, mainJsonobject: boolean, darkTheme: boolean) {
    if (mainJsonobject) {
        let limitSeparator = json.split('contrast')[0].split(",").length - 1;
        json = json.split(',', limitSeparator).join(",\n") + ','
    } else {
        if (darkTheme) {
            json = json.split(',').join(":$dark-primary-text,\n");
            json = json + ":$dark-primary-text,\n"
        } else {
            json = json.split(',').join(":$light-primary-text,\n");
            json = json + ":$light-primary-text,\n"
        }
    }
    json = json.split('"').join("").split("[").join("").split("{").join("").split("}").join("").split("]").join("")
    json = json.split(':').join(" : ");
    return json
}
