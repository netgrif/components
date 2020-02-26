import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    Tree,
    url
} from '@angular-devkit/schematics';
// import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
// import { getFileContent } from '@schematics/angular/utility/test';
import {normalize, strings} from '@angular-devkit/core';
import {getNaeConfigurationString, getProjectInfo} from "../utilityFunctions";
// import { addProviderToModule} from '@schematics/angular/utility/ast-utils';
// import {addProviderToModule, Change, InsertChange} from "schematics-utilities";
// import { HostTree } from '@angular-devkit/schematics';

export function projectConfigurationService(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const naeConfig = getNaeConfigurationString(tree);

        const templateSource = apply(url('./files'), [
            applyTemplates({
                classify: strings.classify,
                dasherize: strings.dasherize,
                project: projectInfo.projectName,
                configuration: naeConfig
            }),
            move(normalize(projectInfo.path as string)),
        ]);

        // addAppModule();
        return chain([
            mergeWith(templateSource)
        ]);
    };
}

// function getTsSource(path: string, content: string): ts.SourceFile {
//     return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
// }

// function applyChanges(path: string, content: string, changes: Change[]): string {
//     const tree = new HostTree();
//     tree.create(path, content);
//     const exportRecorder = tree.beginUpdate(path);
//     for (const change of changes) {
//         if (change instanceof InsertChange) {
//             exportRecorder.insertLeft(change.pos, change.toAdd);
//         }
//     }
//     tree.commitUpdate(exportRecorder);
//
//     return getFileContent(tree, path);
// }

// function addAppModule()  {
//     const moduleContent = `
//       import { BrowserModule } from '@angular/platform-browser';
//       import { NgModule } from '@angular/core';
//
//       @NgModule({
//         imports: [BrowserModule],
//         declarations: [],
//         providers: [
//           {
//             provide: HTTP_INTERCEPTORS,
//             useClass: AuthInterceptor,
//             multi: true
//           }
//         ]
//       })
//       export class AppModule { }
//     `;
//
//     let modulePath = '/src/app/app.module.ts';
//     const source = getTsSource(modulePath, moduleContent);
//     // @ts-ignore
//     const changes = addProviderToModule(source, modulePath, 'LogService', './log.service');
//     const output = applyChanges(modulePath, moduleContent, changes);
//     console.log(output)
//
// }

// providers: [
//     {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}
// ],
