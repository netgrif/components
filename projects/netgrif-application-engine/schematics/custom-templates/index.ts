import {Rule, SchematicContext, Tree, url, applyTemplates, apply, move, chain, mergeWith} from '@angular-devkit/schematics';

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

export function customTemplates(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {

        let data = JSON.parse(tree.read("./nae.json")!.toString());

        let primaryLigt = handleJsonString(JSON.stringify(data.theme.pallets.light.primary), true, false) + '\n';
        let primaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.dark), false, true);
        let secondaryLight =  handleJsonString(JSON.stringify(data.theme.pallets.light.secondary), true, false) + '\n';
        let secondaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.light),false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.dark), false,false);
        let warnLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn), true, false) + '\n';
        let warnContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.dark), false, true);
        let primaryDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary), true, false) + '\n' + "contrast : ( " + '\n';
        let primaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.dark), false, true);
        let secondaryDark =  handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary), true, false) + '\n' + "contrast : ( " + '\n';
        let secondaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.dark), false, true);
        let warnDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.warn), true, false) + '\n' + "contrast : ( " + '\n';
        let warnContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.dark), false, true);


        const customTemplates = apply(
            url('./files'),
            [
                applyTemplates({
                    primaryLigt : primaryLigt,
                    primaryContrastLight : primaryContrastLight,
                    secondaryLight : secondaryLight,
                    secondaryContrastLight : secondaryContrastLight,
                    warnLight : warnLight,
                    warnContrastLight : warnContrastLight,
                    primaryDark : primaryDark,
                    primaryContrastDark : primaryContrastDark,
                    secondaryDark : secondaryDark,
                    secondaryContrastDark : secondaryContrastDark,
                    warnDark : warnDark,
                    warnContrastDark : warnContrastDark
                }),
                move("./styles/templates")
            ]
        );

        return chain([
            mergeWith(customTemplates)
        ]);
    }
}
