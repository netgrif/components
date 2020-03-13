import {Rule, SchematicContext,SchematicsException, Tree, url, applyTemplates, apply, move, chain, mergeWith} from '@angular-devkit/schematics';
import {Schema} from "./schema";
import { getProjectInfo } from "../utilityFunctions";

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

export function customTemplates(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {


        let data = JSON.parse(tree.read("./nae.json")!.toString());
        let correctPath = false;

        const { path } = _options;
        if (tree.exists(path) && path.includes("styles.scss")) {
            tree.overwrite(path,"@import \"./styles/templates/customThemes.scss\"; "+ '\n' + "@include mat-core();" + '\n'  +tree.read(path));
            correctPath = true
        }
        else if(tree.exists("./projects/"+getProjectInfo(tree).projectName+"/src/styles.scss")){
            tree.overwrite("./projects/"+getProjectInfo(tree).projectName+"/src/styles.scss","@import \"./styles/templates/customThemes.scss;"+ '\n' + "@include mat-core();" + '\n'  +tree.read("./projects/"+getProjectInfo(tree).projectName+"/src/styles.scss"));
        }
        else{
            throw new SchematicsException('Your typed path : '+path+' incorrect and no file styles.scss in src folder.');
        }

        let primaryLigt = handleJsonString(JSON.stringify(data.theme.pallets.light.primary), true, false) + '\n';
        let primaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.dark), false, true);
        let secondaryLight =  handleJsonString(JSON.stringify(data.theme.pallets.light.secondary), true, false) + '\n';
        let secondaryContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.light),false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.dark), false,true);
        let warnLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn), true, false) + '\n';
        let warnContrastLight = handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.dark), false, true);
        let primaryDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.primary), true, false)  ;
        let primaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.dark), false, true);
        let secondaryDark =  handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary), true, false);
        let secondaryContrastDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.light), false, false) + " " + handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.dark), false, true);
        let warnDark = handleJsonString(JSON.stringify(data.theme.pallets.dark.warn), true, false);
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
                correctPath ? move(path.replace('styles.scss','')+"/styles/templates") : move("./projects/"+getProjectInfo(tree).projectName+"/src/styles/templates")
            ]
        );

        return chain([
            mergeWith(customTemplates)
        ]);
    }
}
